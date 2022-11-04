import os
import numpy as np
import glob

from music21 import corpus, converter

from keras.layers import LSTM, Input, Dropout, Dense, Activation, Embedding, Concatenate, Reshape
from keras.layers import Flatten, RepeatVector, Permute, TimeDistributed
from keras.layers import Multiply, Lambda, Softmax
import keras.backend as K 
from keras.models import Model
from keras.optimizers import RMSprop

from keras.utils import np_utils

def get_music_list(data_folder):
    
    if data_folder == 'chorales':
        file_list = ['bwv' + str(x['bwv']) for x in corpus.chorales.ChoraleList().byBWV.values()]
        parser = corpus
    else:
        file_list = glob.glob(os.path.join(data_folder, "*.mid"))
        parser = converter
    
    return file_list, parser

def create_network(n_notes, n_durations, embed_size = 100, rnn_units = 256, use_attention = False):
    """ create the structure of the neural network """
    
    # 이전 음표 이름 & 박자, 시퀀스 길이 지정 X (어텐션 메커니즘에서는 입력의 길이가 고정될 필요 없음)
    notes_in = Input(shape = (None,))
    durations_in = Input(shape = (None,))

    # 임베딩 층 : 음표 이름과 박자에 대한 정숫값을 벡터로 변환
    x1 = Embedding(n_notes, embed_size)(notes_in)
    x2 = Embedding(n_durations, embed_size)(durations_in) 

    # 음표 & 박자에 대한 벡터가 하나의 긴 벡터로 여녈되어 순환층의 입력으로 사용됨
    x = Concatenate()([x1,x2])
    
    # 네트워크의 순환 층 : 두 개의 적층 LSTM 층을 사용함 , 전체 은닉 상태의 시퀀스를 다음 층에 전달하기 위해 return_sequences 매개변수를 True로 지정
    x = LSTM(rnn_units, return_sequences=True)(x)
    # x = Dropout(0.2)(x)

    if use_attention:

        x = LSTM(rnn_units, return_sequences=True)(x)
        # x = Dropout(0.2)(x)

        e = Dense(1, activation='tanh')(x)    # 하나의 출력 유닛과 tanh 활성화 함수를 지닌 Dense층
        e = Reshape([-1])(e)                  # 출력을 하나의 벡터로 펼힘 (이 벡터의 길이는 입력 시퀀스 길이 seq_len와 동일 )
        
        # 가중치 계산
        alpha = Activation('softmax')(e)
        
        # 가중치 합 얻기 위해 RepeatVector층으로 가중치를 rnn_units번 복사 
        # => [rnn_units, seq_len] 크기 행렬 만듦 => Permute 통해 전치 [seq_len, rnn_units]
        alpha_repeated = Permute([2, 1])(RepeatVector(rnn_units)(alpha))

        c = Multiply()([x, alpha_repeated])   # 위에서 구한 행렬과 마지막 LSTM층의 은닉 상태와 원소별 곱셈 수행
        c = Lambda(lambda xin: K.sum(xin, axis=1), output_shape=(rnn_units,))(c)  # seq_len축을 따라 더해 rnn_units 길이의 문맥벡터를 만듦
    
    else:
        c = LSTM(rnn_units)(x)
        # c = Dropout(0.2)(c)
                                    
    notes_out = Dense(n_notes, activation = 'softmax', name = 'pitch')(c)     # 음표 이름
    durations_out = Dense(n_durations, activation = 'softmax', name = 'duration')(c)    # 음표 길이
   
    model = Model([notes_in, durations_in], [notes_out, durations_out])     # 입력 : 이전 음표 이름과 박자  # 출력 : 다음 음표 이름과 박자
    

    if use_attention:
        att_model = Model([notes_in, durations_in], alpha)      # alpha 벡터 출력하는 모델
    else:
        att_model = None

    # 음표 이름과 박자 출력은 다중 분류 문제이므로 categorical_crossentropy 사용해 모델 컴파일
    opti = RMSprop(lr = 0.001)
    model.compile(loss=['categorical_crossentropy', 'categorical_crossentropy'], optimizer=opti) 

    return model, att_model


def get_distinct(elements):
    # Get all pitch names
    element_names = sorted(set(elements))
    n_elements = len(element_names)
    return (element_names, n_elements)

def create_lookups(element_names):
    # create dictionary to map notes and durations to integers
    element_to_int = dict((element, number) for number, element in enumerate(element_names))
    int_to_element = dict((number, element) for number, element in enumerate(element_names))

    return (element_to_int, int_to_element)
    

def prepare_sequences(notes, durations, lookups, distincts, seq_len =32):
    """ Prepare the sequences used to train the Neural Network """

    note_to_int, int_to_note, duration_to_int, int_to_duration = lookups
    note_names, n_notes, duration_names, n_durations = distincts

    notes_network_input = []
    notes_network_output = []
    durations_network_input = []
    durations_network_output = []

    # create input sequences and the corresponding outputs
    for i in range(len(notes) - seq_len):
        notes_sequence_in = notes[i:i + seq_len]
        notes_sequence_out = notes[i + seq_len]
        notes_network_input.append([note_to_int[char] for char in notes_sequence_in])
        notes_network_output.append(note_to_int[notes_sequence_out])

        durations_sequence_in = durations[i:i + seq_len]
        durations_sequence_out = durations[i + seq_len]
        durations_network_input.append([duration_to_int[char] for char in durations_sequence_in])
        durations_network_output.append(duration_to_int[durations_sequence_out])

    n_patterns = len(notes_network_input)

    # reshape the input into a format compatible with LSTM layers
    notes_network_input = np.reshape(notes_network_input, (n_patterns, seq_len))
    durations_network_input = np.reshape(durations_network_input, (n_patterns, seq_len))
    network_input = [notes_network_input, durations_network_input]

    notes_network_output = np_utils.to_categorical(notes_network_output, num_classes=n_notes)
    durations_network_output = np_utils.to_categorical(durations_network_output, num_classes=n_durations)
    network_output = [notes_network_output, durations_network_output]

    return (network_input, network_output)


def sample_with_temp(preds, temperature):

    if temperature == 0:
        return np.argmax(preds)
    else:
        preds = np.log(preds) / temperature
        exp_preds = np.exp(preds)
        preds = exp_preds / np.sum(exp_preds)
        return np.random.choice(len(preds), p=preds)

