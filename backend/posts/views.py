from rest_framework import generics, mixins, response
from rest_framework.parsers import FormParser, MultiPartParser
from django.contrib.auth import get_user_model
from .models import Post
from .serializers import PostSerializer, PostDetailSerializer
from .permission import IsAuthorOrReadOnly
from .pagination import PostPagination

# Create your views here.
class PostListAPI(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    pagination_class = PostPagination

class PostDetailAPI(generics.RetrieveDestroyAPIView):
    permission_classes = (IsAuthorOrReadOnly,)
    queryset = Post.objects.all()
    serializer_class = PostDetailSerializer

class PostUpdateDeleteView(generics.RetrieveAPIView,mixins.UpdateModelMixin,mixins.DestroyModelMixin):
    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.filter(author=self.request.user)
    
    def patch(self,request,*args,**kwargs):
        return self.partial_update(request,*args,**kwargs)

    def delete(self,request,*args,**kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return response.Response(status=status.HTTP_204_NO_CONTENT)


