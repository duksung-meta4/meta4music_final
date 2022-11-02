from django.db import models
import base64

class Lyrics(models.Model):
    id=models.AutoField(primary_key=True);
    lyrics=models.TextField();
    userid=models.ForeignKey("account.LoginUser",on_delete=models.CASCADE)
    def __str__(self):
        return self.lyrics;
    
class Compose(models.Model):
     id=models.AutoField(primary_key=True);
     music=models.TextField();
     adminid=models.ForeignKey("account.LoginUser",on_delete=models.CASCADE)

class Images(models.Model):
    id=models.AutoField(primary_key=True)
    canvas=models.TextField()
    adminid=models.ForeignKey("account.LoginUser",on_delete=models.CASCADE)

