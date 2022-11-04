from django.urls import path
from . import views 

#account/home

app_name='account';

urlpatterns=[
    path('logout',views.logout,name="logout"),
    path('login/',views.login, name="login"),
    path('signup2/',views.signup2, name="signup2"),
]
