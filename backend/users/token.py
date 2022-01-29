from rest_framework import serializers
from dj_rest_auth.models import TokenModel
from .serializer import TokenSerializer

class TokenSerializer(serializers.ModelSerializer):
    user = TokenSerializer(many=False,read_only=True)

    class Meta:
        model = TokenModel
        fields = ('key','user')