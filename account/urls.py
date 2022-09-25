from django.urls import path
from . import views 

#account/home

app_name='account';

urlpatterns=[
    path('signup',views.signup, name="signup"),
    path('signin',views.signin, name="signin"),
    path('logout',views.logout,name="logout"),
]
