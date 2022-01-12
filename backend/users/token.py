from rest_framework import serializers
from dj_rest_auth.models import TokenModel
from .serializer import UserSerializer

class TokenSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False,read_only=True)

    class Meta:
        model = TokenModel
        fields = ('key','user')