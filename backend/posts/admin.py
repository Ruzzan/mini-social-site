from django.contrib import admin
from django.contrib.auth.models import Group
from .models import Post,Comment

# Register your models here.

admin.site.register(Post)
admin.site.register(Comment)