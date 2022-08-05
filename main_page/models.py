from django.db import models
import base64

class User(models.Model): 
    id=models.AutoField(primary_key=True);
    password=models.TextField();
    full_name=models.CharField(max_length=45);

class Lyrics(models.Model):
    id=models.AutoField(primary_key=True);
    lyrics=models.TextField();
    userid=models.ForeignKey("User",on_delete=models.CASCADE)
    def __str__(self):
        return self.lyrics;
    
class Compose(models.Model):
     id=models.AutoField(primary_key=True);
     music=models.TextField();
     adminid=models.ForeignKey("User",on_delete=models.CASCADE)

class Images(models.Model):
    id=models.AutoField(primary_key=True);
    _data = models.TextField(db_column='data',blank=True);
    def set_data(self, data):
        self._data = base64.encodestring(data)
    def get_data(self):
        return base64.decodestring(self._data)
    data = property(get_data, set_data)
    createdAt=models.DateTimeField();
    updatedAt=models.DateTimeField();
    imagescol=models.CharField(max_length=45);
    memberid=models.ForeignKey("User",on_delete=models.CASCADE);

