from django.contrib import admin
from django.contrib.auth.models import Group
from .models import Post

# Register your models here.

admin.site.register(Post)