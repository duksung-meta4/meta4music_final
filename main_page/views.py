import random
from django.shortcuts import render,redirect
from ratsnlp.nlpbook.generation import GenerationDeployArguments
from transformers import PreTrainedTokenizerFast
import torch
from transformers import GPT2Config,GPT2LMHeadModel
from .models import Lyrics, Compose, Images
from account.models import LoginUser
from django.views.decorators.csrf import csrf_exempt
from django.contrib import messages

# 스샷
import base64

# 작곡
import pickle as pkl
import time
import os
import numpy as np
import sys
from music21 import instrument, note, stream, chord, duration, converter
from .RNNAttention import create_network, sample_with_temp
import matplotlib.pyplot as plt

result_dict={};
result_dict2={};

# Create your views here.
def home(request):
    try:
        user_id=LoginUser.objects.all()[:1][0].id
    except:
        return render(request, 'main_page/home_t.html')
    else:
        user_dict={"id":user_id};
        return render(request, 'main_page/home_t.html',context=user_dict)
    
def home_view(request):
    return render(request, 'main_page/home.html')

def drawing_view(request):
    return render(request, 'main_page/drawing.html')    

def meta(request):
    # 작사
    lyric=Lyrics.objects.last();
    lyrics=lyric.lyrics;
    #작곡
    compose = Compose.objects.last();
    midi = compose.music;
    #이미지
    img = Images.objects.last();
    image = img.canvas;

    data={"lyrics":lyrics, "midi": midi, "image": image};

    return render(request,'main_page/index.html',context=data);

# canvas 이미지 저장
@csrf_exempt
def canvasToImage(request):
    if request.method == "POST":
        data = request.POST.__getitem__('data')
        data = data[22:]
        number = random.randrange(1,10000)

        # 저장할 경로 및 파일명을 지정
        path = str('main_page/static/')
        filename = 'resultImg/image' + str(number) + '.png'

        # "wb" (즉, 바이너리파일 쓰기전용)으로 파일을 open
        image = open(path+filename, "wb")

        # `base64.b64decode()`를 통하여 디코딩을 하고 파일에 써준다.
        image.write(base64.b64decode(data))
        image.close()

        # sql에 저장
        user=LoginUser.objects.all()[:1][0]     
        img=Images()
        img.canvas = filename
        img.adminid=user
        img.save()
        messages.success(request,'사진이 저장되었습니다.')

    # filename을 json형식에 맞추어 response를 보내준다.
    # answer = {'filename':filename}
    return render(request, 'main_page/drawing.html')


@csrf_exempt
def post(request):
    if request.method=="POST":
        user=LoginUser.objects.all()[:1][0];      
        lyric=Lyrics();
        lyric.lyrics=request.POST['content'];
        lyric.userid=user;
        lyric.save();
        messages.success(request,'작사가 저장되었습니다.')
        #URL
        return render(request,'main_page/playing.html',context=result_dict)
    else:
        lyrics=Lyrics.objects.all();
        #template
        return render(request,'main_page/playing.html',{'lyrics':lyrics})


@csrf_exempt
def post2(request):
    if request.method=="POST":
        user=LoginUser.objects.all()[:1][0];      
        compose=Compose();
        compose.music=request.POST['content'];
        compose.adminid=user;
        compose.save();
        messages.success(request,'작곡이 저장되었습니다.')

    return render(request,'main_page/composing.html', context=result_dict2)


def playing_view(request):
    return render(request, 'main_page/playing.html')

def result_view(request):
    lyric=Lyrics.objects.last();
    lyrics=lyric.lyrics;
    
    compose = Compose.objects.last();
    midi = compose.music;

    img = Images.objects.last();
    image = img.canvas;

    dict={"lyrics":lyrics, "midi": midi, "image": image};

    return render(request, 'main_page/result.html',context= dict);

@csrf_exempt
def makeLyric(request,lyric):
    args=GenerationDeployArguments(
    pretrained_model_name="skt/kogpt2-base-v2",
    downstream_model_dir="main_page/static/kogpt2/checkpoint-generation",
	)
    tokenizer=PreTrainedTokenizerFast.from_pretrained(
    args.pretrained_model_name,
    eos_token="</s>",
	)
    pretrained_model_config=GPT2Config.from_pretrained(
    args.pretrained_model_name
	)
    model=GPT2LMHeadModel(pretrained_model_config)
    fine_tuned_model_ckpt=torch.load(
        args.downstream_model_checkpoint_fpath,
        map_location=torch.device("cpu")
    )
    model.load_state_dict({k.replace("model.",""): v for k,v in fine_tuned_model_ckpt['state_dict'].items()})
    model.eval()
    def inference_fn(
        prompt,
        min_length=30,
        max_length=60,
        top_p=1.0,
        top_k=50,
        repetition_penalty=1.0,
        no_repeat_ngram_size=3,
        temperature=0.5,
    ):
        try :
            input_ids=tokenizer.encode(prompt,return_tensors="pt")
            with torch.no_grad():
                generated_ids=model.generate(
                    input_ids,
                    do_sample=True,
                    top_p=float(top_p),
                    top_k=int(top_k),
                    min_length=int(min_length),
                    max_length=int(max_length),
                    repetition_penalty=float(repetition_penalty),
                    no_repeat_ngram_size=int(no_repeat_ngram_size),
                    temperature=float(temperature),
                )
            generated_sentence=tokenizer.decode([el.item() for el in generated_ids[0]])
        except:
            generated_sentence="""처리 중 오류가 발생했습니다. <br>
                변수의 입력 범위를 확인하세요 <br><br>
                min_length: 1 이상의 정수 <br>
                max_length: 1 이상의 정수 <br>
                top-p: 0 이상 1 이하의 실수 <br>
                top-k: 1 이상의 정수 <br>
                repetition_penalty: 1 이상의 실수 <br>
                no_repeat_ngram_size: 1 이상의 정수 <br>
                temperature: 0 이상의 실수
                """
        return {
            'result': generated_sentence,
        }

    result=inference_fn(str(lyric)+"\n ")['result']
    global result_dict;
    result_dict={"lyric":result};

    return render(request,'main_page/playing.html',context=result_dict);

def compose(requests):
    return render(requests, 'main_page/composing.html')


# 작곡 모델 불러오기
def composing(request, keyword):
    # 실행 파라미터
    section = 'compose'
    run_id = '0007'
    music_name = 'child/{}'.format(str(keyword))
    run_folder = 'main_page/static/run/{}/'.format(section)
    run_folder += '_'.join([run_id, music_name])

    # 하이퍼파라미터
    embed_size = 100
    rnn_units = 256
    use_attention = True

    store_folder = os.path.join(run_folder, 'store')

    with open(os.path.join(store_folder, 'distincts'), 'rb') as filepath:
        distincts = pkl.load(filepath)
        note_names, n_notes, duration_names, n_durations = distincts

    with open(os.path.join(store_folder, 'lookups'), 'rb') as filepath:
        lookups = pkl.load(filepath)
        note_to_int, int_to_note, duration_to_int, int_to_duration = lookups

    # 모델 가져오기
    weights_folder = os.path.join(run_folder, 'weights')
    weights_file = 'weights.h5'

    model, att_model = create_network(n_notes, n_durations, embed_size, rnn_units, use_attention)

    # 각 노드에 가중치 적재하기
    weight_source = os.path.join(weights_folder,weights_file)
    model.load_weights(weight_source)
    model.summary()

    notes_temp=0.8     # temperature 변동성 부여 0.5
    duration_temp = 0.8
    max_extra_notes = 50
    max_seq_len = 32
    seq_len = 32

    notes = ['START']
    durations = [0]

    if seq_len is not None:
        notes = ['START'] * (seq_len - len(notes)) + notes
        durations = [0] * (seq_len - len(durations)) + durations


    sequence_length = len(notes)

    prediction_output = []
    notes_input_sequence = []
    durations_input_sequence = []

    overall_preds = []

    for n, d in zip(notes,durations):
        note_int = note_to_int[n]
        duration_int = duration_to_int[d]
        
        notes_input_sequence.append(note_int)
        durations_input_sequence.append(duration_int)
        
        prediction_output.append([n, d])
        
        if n != 'START':
            midi_note = note.Note(n)

            new_note = np.zeros(128)
            new_note[midi_note.pitch.midi] = 1
            overall_preds.append(new_note)


    att_matrix = np.zeros(shape = (max_extra_notes+sequence_length, max_extra_notes))

    # 생성하고 싶은 만큼 새로운 시퀀스로 과정 반복
    for note_index in range(max_extra_notes):

        prediction_input = [
            np.array([notes_input_sequence])
            , np.array([durations_input_sequence])
        ]

        notes_prediction, durations_prediction = model.predict(prediction_input, verbose=0)
        if use_attention:
            att_prediction = att_model.predict(prediction_input, verbose=0)[0]
            att_matrix[(note_index-len(att_prediction)+sequence_length):(note_index+sequence_length), note_index] = att_prediction
        
        new_note = np.zeros(128)
        
        for idx, n_i in enumerate(notes_prediction[0]):
            try:
                note_name = int_to_note[idx]
                midi_note = note.Note(note_name)
                new_note[midi_note.pitch.midi] = n_i
                
            except:
                pass
            
        overall_preds.append(new_note)
                
        
        i1 = sample_with_temp(notes_prediction[0], notes_temp)
        i2 = sample_with_temp(durations_prediction[0], duration_temp)
        

        note_result = int_to_note[i1]
        duration_result = int_to_duration[i2]
        
        prediction_output.append([note_result, duration_result])

        notes_input_sequence.append(i1)
        durations_input_sequence.append(i2)
        
        if len(notes_input_sequence) > max_seq_len:
            notes_input_sequence = notes_input_sequence[1:]
            durations_input_sequence = durations_input_sequence[1:]
            
            
        if note_result == 'START':
            break

    overall_preds = np.transpose(np.array(overall_preds)) 
    #print('Generated sequence of {} notes'.format(len(prediction_output)))

    output_folder = os.path.join(run_folder, 'output')

    midi_stream = stream.Stream()

    # 모델이 생성한 값을 기반으로 악보와 화음 객체 만들기
    for pattern in prediction_output:
        note_pattern, duration_pattern = pattern
        # 패턴이 화음일 경우
        if ('.' in note_pattern):
            notes_in_chord = note_pattern.split('.')
            chord_notes = []
            for current_note in notes_in_chord:
                new_note = note.Note(current_note)
                new_note.duration = duration.Duration(duration_pattern)
                new_note.storedInstrument = instrument.Violoncello()
                chord_notes.append(new_note)
            new_chord = chord.Chord(chord_notes)
            midi_stream.append(new_chord)
        elif note_pattern == 'rest':
        # 패턴이 쉼표일 경우
            new_note = note.Rest()
            new_note.duration = duration.Duration(duration_pattern)
            new_note.storedInstrument = instrument.Violoncello()
            midi_stream.append(new_note)
        elif note_pattern != 'START':
        # 패턴이 하나의 음표일 경우
            new_note = note.Note(note_pattern)
            new_note.duration = duration.Duration(duration_pattern)
            new_note.storedInstrument = instrument.Violoncello()
            midi_stream.append(new_note)



    midi_stream = midi_stream.chordify()
    timestr = time.strftime("%Y%m%d-%H%M%S")
    midi_stream.write('midi', fp=os.path.join(output_folder, 'output-' + timestr + '.mid'))

    
    midi = 'run/compose/0007_child/{}/output/output-'.format(keyword)+ timestr + '.mid'
    global result_dict2
    result_dict2={"midi":midi};

    return render(request, 'main_page/composing.html', context = result_dict2);

