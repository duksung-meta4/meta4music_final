from django.urls import path
from . import views 

#main_page/home

app_name='main_page';

urlpatterns=[
    path('', views.home, name="main"),
    path('home',views.home, name="home"),
    path('drawing',views.drawing_view, name="drawing"),
    path('playing',views.playing_view, name="playing"),
    path('post',views.post, name="post"),
    path('post2',views.post2, name="post2"),
    path('result',views.result_view,name="result"),
    path('playing/<str:lyric>/',views.makeLyric, name="makeLyric"),
    path('composing/',views.compose, name="compose"),
    path('composing/<str:keyword>/',views.composing, name="composing"), 
    path('canvasToImage', views.canvasToImage, name="canvasToImage"),
    path('meta', views.meta, name="meta"),
]
