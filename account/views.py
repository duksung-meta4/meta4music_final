from django.shortcuts import render,redirect
from django.views.decorators.csrf import csrf_exempt
from .models import User,LoginUser
from django.contrib import messages

#회원가입에서 이미 가입된 아이디인지 확인.
def signup_get_or_none(classmodel, id): 
    try:
        print(classmodel.objects.get(id=id));
        return classmodel.objects.get(id=id);
    except classmodel.DoesNotExist:
        return None

#로그인에서 회원정보 확인
def signin_get_or_none(classmodel, id, password): 
    try:
        return classmodel.objects.get(id=id, password=password);
    except classmodel.DoesNotExist:
        return None


# 회원가입 signup2
@csrf_exempt
def signup2(request):
    if request.method=="GET":
        return render(request, 'account/signup_t.html');
    if request.method=="POST":
        user=User();
        user.id=request.POST['id'];
        user.password=request.POST['password'];
        print(user.id,user.password);
        if signup_get_or_none(User,user.id) is None:
            user.save();
            messages.success(request, '회원가입되었습니다.');
            return redirect('account:login');
        else:
            messages.error(request,'이미 등록된 id입니다.')
            return redirect('account:signup2');
            

# 로그인 signin
@csrf_exempt
def login(request):
    if request.method=="GET":
        return render(request, 'account/login.html')
    if request.method=="POST":
        userid=request.POST['id'];
        userpassword=request.POST['password'];
        user=signin_get_or_none(User, id=userid,password=userpassword);
        if user is not None:
            loginuser=LoginUser();
            loginuser.id=userid;
            loginuser.password=userpassword;
            loginuser.save();
            # messages.success(request, "로그인되었습니다.");
            user_dict={"id":userid}
            return render(request,'main_page/home_t.html',context=user_dict)
        else:
            messages.error(request,'ID 혹은 비밀번호 오류입니다.');
            return redirect('account:login');

@csrf_exempt
def logout(request):
    if request.method=="GET":
        LoginUser.objects.all().delete();
        return redirect('main_page:main')