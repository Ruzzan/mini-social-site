from rest_framework import generics, views, parsers
from rest_framework.decorators import api_view,parser_classes
from rest_framework.response import Response
from .serializer import UserSerializer,UserUpdateSerializer
from django.contrib.auth import get_user_model
from posts.models import Post
from posts.serializers import PostSerializer

Users = get_user_model()

class UsersListAPI(generics.ListAPIView):
    queryset = Users.objects.all()
    serializer_class = UserSerializer

class ProfileAPI(views.APIView):
#context = {'request':self.request} will pass the domain name / abs url of the media file
    def get_current_user(self):
        user_serializer = UserSerializer(self.request.user,context={'request': self.request})
        return user_serializer.data
    
    def get_user_posts(self):
        user_posts = Post.objects.filter(author=self.request.user)
        return PostSerializer(user_posts,many=True,context={'request':self.request}).data

    def get(self,*args,**kwargs):
        return Response({
        'user':self.get_current_user(),
        'posts':self.get_user_posts()
    })

@api_view(['GET'])
def UserDetailAPI(request,pk):
        user = get_user_model().objects.get(pk=pk)
        user_serializer = UserSerializer(user,context={'request':request}).data
        user_posts = Post.objects.filter(author=user)
        post_serializer = PostSerializer(user_posts,many=True,context={'request':request}).data
        return Response({
            'user':user_serializer,
            'posts':post_serializer
        })

@api_view(['GET','PATCH'])
@parser_classes([parsers.MultiPartParser,parsers.FormParser])
def UpdateUserAPI(request):
    serializer = UserUpdateSerializer(request.user)
    if request.method == "PATCH":
        serializer = UserUpdateSerializer(request.user,request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
    return Response(serializer.data)

@api_view(['GET'])
def follow_user(request,pk):
    user = get_user_model().objects.get(pk=pk)
    current_user = request.user
    if current_user in user.followers.all():
        user.followers.remove(current_user)
        return  Response({"data":"Unfollowed"})
    else:
        user.followers.add(current_user)
        return Response({"data":"Followed"})

class UserSearch(generics.ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        queryset = get_user_model().objects.all()
        search_query = self.request.query_params.get('q',None)
        if search_query:
            queryset = get_user_model().objects.filter(username__icontains=search_query)
        return queryset
