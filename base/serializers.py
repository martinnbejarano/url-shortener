from rest_framework.serializers import ModelSerializer
from .models import MyUser, ShortLink


class MyUserSerializer(ModelSerializer):
    
    class Meta:
        model = MyUser
        fields = ['username', 'email', 'password']
        
class ShortLinkSerializer(ModelSerializer):
    
    class Meta:
        model = ShortLink
        fields = ['short_url', 'original_url']