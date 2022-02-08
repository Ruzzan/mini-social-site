from rest_framework import serializers
from .models import Post, Comment
from django.contrib.auth import get_user_model

# user serializer for posts only
class PostUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id','username','avatar')

# post serializer along with the author data
class PostSerializer(serializers.ModelSerializer):
    author_detail = PostUserSerializer(source='author',read_only=True)
    image = serializers.ImageField(required=False, max_length=None, 
                                     allow_empty_file=True, use_url=True,allow_null=True)
    total_likes = serializers.SerializerMethodField()
    class Meta:
        model = Post
        fields = ('id','body','image','total_likes','timestamp','author','author_detail')
        extra_kwargs = {
            'author': {'required': False},
        }
    
    def get_total_likes(self,instance):
        return instance.likes.count()

class CommentSerializer(serializers.ModelSerializer):
    author_detail = PostUserSerializer(source='author',read_only=True)
    class Meta:
        model = Comment
        fields = ('id','body','author','author_detail','post')
        extra_kwargs = {'author': {'required': False}}

# post detail with comments and user data
class PostDetailSerializer(PostSerializer):
    author_detail = PostUserSerializer(source='author',read_only=True)
    comments = CommentSerializer(many=True,read_only=True)

    class Meta:
        model = Post
        fields = ('id','body','image','timestamp','author','author_detail','comments','total_likes')

