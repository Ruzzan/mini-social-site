from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
    bio = models.CharField(blank=True,null=True,max_length=100)
    avatar = models.ImageField(blank=True,null=True,upload_to='avatar/')
    followers = models.ManyToManyField('self',related_name='followers',blank=True)
