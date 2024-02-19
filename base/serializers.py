from rest_framework.serializers import ModelSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import MyUser, ShortLink


class MyUserSerializer(ModelSerializer):
    
    class Meta:
        model = MyUser
        fields = ['username', 'email', 'password']
        
class ShortLinkSerializer(ModelSerializer):
    
    class Meta:
        model = ShortLink
        fields = ['short_url', 'original_url']
        
        
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['email'] = user.email

        return token