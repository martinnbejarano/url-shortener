from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import make_password
from django.shortcuts import get_object_or_404
import hashlib

from .models import MyUser, ShortLink
from .serializers import MyUserSerializer, ShortLinkSerializer


def random_url(original_url):
    hash_object = hashlib.md5(original_url.encode())
    hash_str = hash_object.hexdigest()

    short_url = hash_str[:6]
    return short_url

class Register(APIView):
    
    def post(self, request):
        data = request.data
        
        try:
            user = MyUser.objects.create(
                username = data['username'],
                email = data['email'],
                password = make_password(data['password'])
            )
            
            serializer = MyUserSerializer(user, many = False)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        except Exception as e:
            message = { 'detail': f'something went wrong: {str(e)}'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)


class UserURL(APIView):
    
    permission_classes = [IsAuthenticated]
    
    def get(self, request):

        user = request.user      
        short_links = ShortLink.objects.filter(user = user)
        serializer = ShortLinkSerializer(short_links, many = True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        data = request.data
        user = request.user
        
        short_url = data.get('short_url') or random_url(data['original_url'])
        
        short_link = ShortLink.objects.create(
            short_url = short_url,
            original_url = data['original_url'],
            user = user
        )
        
        serializer = ShortLinkSerializer(short_link, many = False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def put(self, request):
        new_url = request.data.get('new_url')
        original_short_url = request.data.get('original_short_url')
        
        if not new_url:
            return Response({'detail': 'missing short_url parameter'}, status=status.HTTP_400_BAD_REQUEST)
        
        short_link = get_object_or_404(ShortLink, short_url = original_short_url, user = request.user)
        
        short_link.original_url = new_url
        short_link.save()
        
        serializer = ShortLinkSerializer(short_link, many = False)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class ShortURL(APIView):
    
    def get(self, request, short_url):
        
        short_link = get_object_or_404(ShortLink, short_url = short_url)
        serializer = ShortLinkSerializer(short_link, many = False)
        
        return Response(serializer.data, status = status.HTTP_200_OK)
        
        