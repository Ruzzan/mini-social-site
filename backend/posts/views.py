from rest_framework import generics, mixins, response, status, viewsets
from django.contrib.auth import get_user_model
from .models import Post
from .serializers import PostSerializer, UserSerializer
from .pagination import PostPagination

# Create your views here.
class PostListAPI(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    pagination_class = PostPagination

class PostDetailAPI(generics.RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
