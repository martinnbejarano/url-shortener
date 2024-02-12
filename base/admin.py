from django.contrib import admin
from .models import MyUser, ShortLink

admin.site.register(MyUser)
admin.site.register(ShortLink)