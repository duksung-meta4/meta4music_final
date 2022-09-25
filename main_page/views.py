from django.shortcuts import render,redirect
from ratsnlp.nlpbook.generation import GenerationDeployArguments
from transformers import PreTrainedTokenizerFast
import torch
from transformers import GPT2Config,GPT2LMHeadModel
from .models import Lyrics
from account.models import LoginUser
from django.views.decorators.csrf import csrf_exempt
from django.contrib import messages


# Create your views here.
def home(request):
    return render(request, 'main_page/home_t.html')

def home_view(request):
    return render(request, 'main_page/home.html')

def drawing_view(request):
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
        return redirect('http://127.0.0.1:8000/main_page/playing')
    else:
        lyrics=Lyrics.objects.all();
        #template
        return render(request,'main_page/playing.html',{'lyrics':lyrics})

def playing_view(request):
    return render(request, 'main_page/playing.html')

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
    result_dict={"lyric":result};

    return render(request,'main_page/playing.html',context=result_dict);
 