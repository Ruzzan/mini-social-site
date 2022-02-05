from rest_framework import serializers
from django.contrib.auth import get_user_model

# all the users for follow
class UserSerializer(serializers.ModelSerializer):
    total_followers = serializers.SerializerMethodField()
    is_following = serializers.SerializerMethodField()
    
    def get_total_followers(self,instance):
        return instance.followers.count()
    
    def get_is_following(self,instance):
        request = self.context.get('request',None)
        if request:
            user = request.user
            return user in instance.followers.all()

    class Meta:
        model = get_user_model()
        fields = ('id','username', 'email' ,'avatar', 'bio','total_followers','is_following')
        extra_kwargs = {'is_following': {'required': False}}

class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id','username', 'email' ,'avatar', 'bio',)

# this will be passed when login 
class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields =  ('id','username' ,'avatar')