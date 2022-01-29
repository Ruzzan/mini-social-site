from rest_framework import serializers
from django.contrib.auth import get_user_model

# all the users for follow
class UserSerializer(serializers.ModelSerializer):
    total_followers = serializers.SerializerMethodField()

    def get_total_followers(self,instance):
        return instance.followers.count()
    class Meta:
        model = get_user_model()
        fields = ('id','username', 'email' ,'avatar', 'bio','total_followers')

# this will be passed when login 
class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields =  ('id','username' ,'avatar')