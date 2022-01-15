from rest_framework import generics, views
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import UserSerializer
from django.contrib.auth import get_user_model
from posts.models import Post
from posts.serializers import PostSerializer

Users = get_user_model()

class UsersListAPI(generics.ListAPIView):
    queryset = Users.objects.all()
    serializer_class = UserSerializer

class ProfileAPI(views.APIView):
    def get_current_user(self):
        user_serializer = UserSerializer(self.request.user)
        return user_serializer.data
    
    def get_user_posts(self):
        user_posts = Post.objects.filter(author=self.request.user)
        return PostSerializer(user_posts,many=True).data

    def get(self,*args,**kwargs):
        return Response({
        'user':self.get_current_user(),
        'posts':self.get_user_posts()
    })

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

