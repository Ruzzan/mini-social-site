from rest_framework import generics, mixins, response, status
from rest_framework.decorators import api_view
from rest_framework.parsers import FormParser, MultiPartParser
from django.contrib.auth import get_user_model
from .models import Post, Comment
from .serializers import PostSerializer, PostDetailSerializer, CommentSerializer
from .permission import IsAuthorOrReadOnly
from .pagination import PostPagination
from django.db.models import Q

# Create your views here.
class PostListAPI(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    pagination_class = PostPagination

    def get_queryset(self):
        user = self.request.user
        #get the followings
        following_users = [following.id for following in user.followers.all()]
        # check if following is 1 or more than 1 show the followers post else show all
        if following_users != []: # if len(following_users) >= 1:
            return Post.objects.filter(Q(author_id__in=following_users)|
            Q(author=self.request.user)).distinct()
        return Post.objects.all()

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

# comment create view
class CommentCreateAPI(generics.CreateAPIView):
    model = Comment
    serializer_class = CommentSerializer

class CommentDelete(generics.RetrieveDestroyAPIView):
    model = CommentSerializer
    serializer_class = CommentSerializer

    def get_queryset(self):
        return Comment.objects.filter(author=self.request.user)

    def delete(self,request,*args,**kwargs):
        instance = self.get_object()
        print(instance)
        self.perform_destroy(instance)
        return response.Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def PostLikeAPI(request,pk):
    try:
        post = Post.objects.get(pk=pk) 
        if request.user in post.likes.all():
            post.likes.remove(request.user)
            return response.Response({"data":"Unliked"})
        else:
            post.likes.add(request.user)
            return response.Response({"data":"Liked"})
    except Post.DoesNotExist:
        return response.Response(status.HTTP_404_NOT_FOUND)

class PostSearch(generics.ListAPIView):
    serializer_class = PostSerializer
    pagination_class = PostPagination

    def get_queryset(self):
        queryset = Post.objects.all()
        search_query = self.request.query_params.get('q',None)
        if search_query:
            queryset = Post.objects.filter(body__icontains=search_query)
        return queryset
