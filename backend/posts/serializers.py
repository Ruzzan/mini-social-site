from rest_framework import serializers
from .models import Post, Comment
from django.contrib.auth import get_user_model

# user serializer for posts only
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id','username','avatar')

# post serializer along with the author data
class PostSerializer(serializers.ModelSerializer):
    author_detail = UserSerializer(source='author',read_only=True)
    image = serializers.ImageField(required=False, max_length=None, 
                                     allow_empty_file=True, use_url=True,allow_null=True)
    class Meta:
        model = Post
        fields = ('id','body','image','timestamp','author','author_detail')

class CommentSerializer(serializers.ModelSerializer):
    author_detail = UserSerializer(source='author',read_only=True)
    class Meta:
        model = Comment
        fields = ('id','body','author','author_detail','post')

# post detail with comments and user data
class PostDetailSerializer(serializers.ModelSerializer):
    author_detail = UserSerializer(source='author',read_only=True)
    comments = CommentSerializer(many=True,read_only=True)

    class Meta:
        model = Post
        fields = ('id','body','image','timestamp','author','author_detail','comments')
