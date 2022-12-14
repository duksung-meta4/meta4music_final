"""
Django settings for meta4music project.

Generated by 'django-admin startproject' using Django 4.0.3.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.0/ref/settings/
"""
import os
from pathlib import Path
from django.contrib import messages

os.environ['KMP_DUPLICATE_LIB_OK']='True'

# RDS 설정
import pymysql
pymysql.install_as_MySQLdb()


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

LOGINUSER_SESSION_REMEMBER=True
SESSION_COOKIE_AGE=3600

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-(*^^ajyl3t%=r!8p65on*y_=7nxo_m)j3m=5w75yo8r4nqol#^'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True
# DEBUG = False   # pythonanywhere 배포 세팅 


# ec2 배포
ALLOWED_HOSTS = ['127.0.0.1', 'ec2-15-164-233-72.ap-northeast-2.compute.amazonaws.com', '.meta4music.kro.kr'] 
# pythonanywhere 배포 세팅 (이 주소가 아니라 다른 주소로 접근하면 막기)
# ALLOWED_HOSTS = ['hyojeong.pythonanywhere.com'] 


    
# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'main_page.apps.MainPageConfig',
    'account.apps.AccountConfig',
    'corsheaders', # ec2 cors 에러 해결
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware', # ec2 cors 에러 해결 #최상단에 추가해주기
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware'
]

# ec2 cors 에러 해결
CORS_ORIGIN_ALLOW_ALL = True
SECURE_CROSS_ORIGIN_OPENER_POLICY = None

MESSAGE_TAGS = {
    messages.DEBUG: 'alert-info',
    messages.INFO: 'alert-info',
    messages.SUCCESS: 'alert-success',
    messages.WARNING: 'alert-warning',
    messages.ERROR: 'alert-danger',
}

ROOT_URLCONF = 'meta4music.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR,'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'meta4music.wsgi.application'



# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.mysql',
#         'NAME': 'meta4DB',
#         'USER':'admin',
#         'PASSWORD':'12341234',
#         'HOST':'localhost',
#         'PORT':'3306',
#     }
# }

# AWS RDS와 연결하기 위한 database 설정
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'meta4DB',
        'USER':'admin',
        'PASSWORD':'12341234',
        'HOST':'database-1.cxhdf5vmbh57.ap-northeast-2.rds.amazonaws.com',  # 생성한 데이터베이스 엔드포인트
        'PORT':'3306',
        'OPTIONS':{
            'init_command' : "SET sql_mode='STRICT_TRANS_TABLES'"
        }
    }
}

# # pythonanywhere에 업로드 하기 위한 databases 수정
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.mysql',
#         'NAME': 'hyojeong$default',
#         'USER':'hyojeong',
#         'PASSWORD':'meta4music',
#         'HOST':'hyojeong.mysql.pythonanywhere-services.com',
#     }
# }


# Password validation
# https://docs.djangoproject.com/en/4.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]



# Internationalization
# https://docs.djangoproject.com/en/4.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Seoul'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.0/howto/static-files/

STATIC_URL = '/static/'


STATICFILES_DIRS = (os.path.join(BASE_DIR, 'main_page\\static'),os.path.join(BASE_DIR,'account\\static'))


# STATIC_ROOT = [os.path.join(BASE_DIR,'static')]
STATIC_ROOT = os.path.join(BASE_DIR, 'static')

# Default primary key field type
# https://docs.djangoproject.com/en/4.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

if DEBUG:
    import mimetypes
    mimetypes.add_type("application/javascript", ".js", True)