from rest_framework import serializers
from .models import Post
from django.contrib.auth import get_user_model

class PostSerializer(serializers.ModelSerializer):
    author_username = serializers.CharField(source='author.username',read_only=True)
    class Meta:
        model = Post
        fields = ('id','body','image','timestamp','author_username')


