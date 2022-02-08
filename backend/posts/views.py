from rest_framework import generics, mixins, response, status
from rest_framework.decorators import api_view
from rest_framework.parsers import FormParser, MultiPartParser
from django.contrib.auth import get_user_model
from .models import Post, Comment
from .serializers import PostSerializer, PostDetailSerializer, CommentSerializer
from .permission import IsAuthorOrReadOnly
from .pagination import PostPagination
from django.db.models import Q
from rest_framework.parsers import FileUploadParser,MultiPartParser,FormParser
from users.serializer import UserSerializer

# Create your views here.
class PostListAPI(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    pagination_class = PostPagination
    parser_classes = (MultiPartParser,FormParser)

    def get_queryset(self):
        user = self.request.user
        #get the followings
        following_users = [following.id for following in user.followers.all()]
        # check if following is 1 or more than 1 show the followers post else show all
        if following_users != []: # if len(following_users) >= 1:
            return Post.objects.filter(Q(author_id__in=following_users)|
            Q(author=self.request.user)).distinct()
        return Post.objects.all()
    
    def perform_create(self,serializer):
        return serializer.save(author=self.request.user)

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

    def perform_create(self,serializer):
        return serializer.save(author=self.request.user)

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


@api_view(['GET'])
def search(request):
    post_query = request.GET.get('post',None)
    user_query = request.GET.get('user',None)
    User = get_user_model()
    if post_query and not user_query:
        queryset = Post.objects.filter(body__icontains=post_query)
        return response.Response({
            "posts":PostSerializer(
                queryset,many=True,
            context={'request':request}).data
        })

    if user_query and not post_query:
        queryset = User.objects.filter(username__icontains=user_query)
        return response.Response({"users":UserSerializer(queryset,many=True).data})

    if post_query and user_query:
        posts = Post.objects.filter(body__icontains=post_query)
        users = User.objects.filter(username__icontains=user_query)
        return response.Response({
            "posts":PostSerializer(posts,many=True,context={'request':request}).data,
            "users":UserSerializer(users,many=True).data
        })
    return []