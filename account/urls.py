from django.urls import path
from . import views 

#account/home

app_name='account';

urlpatterns=[
    path('signup/',views.signup, name="signup"),
    path('signin/',views.signin, name="signin"),
    path('logout',views.logout,name="logout"),
    path('login/',views.login, name="login"),
    path('signup2/',views.signup2, name="signup2"),
]
