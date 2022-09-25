from django.db import models

# 회원가입 정보
class User(models.Model): 
    id=models.CharField(max_length=50,primary_key=True);
    password=models.TextField();
    
# 현재 로그인 중
class LoginUser(models.Model):
    id=models.CharField(max_length=50,primary_key=True);
    password=models.TextField();
    
# Create your models here.
