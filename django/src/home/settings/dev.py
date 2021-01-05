'''Use this for development'''

from .base import *

ALLOWED_HOSTS += ['127.0.0.1', 'localhost', '*']
DEBUG = True

WSGI_APPLICATION = 'home.wsgi.dev.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'speedsnap',
        'USER': 'speedsnap',
        'PASSWORD': '',
        'HOST': '192.168.108.73',
        'PORT': 3306,
    }
}

CORS_ORIGIN_WHITELIST = (
    'http://localhost:3000',
)