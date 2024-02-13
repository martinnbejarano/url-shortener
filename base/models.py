from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class CustomAccountManager(BaseUserManager):
    
    def create_user(self, email, username, password, **other_fields):
        
        if not email:
            raise ValueError('You must provide an email address')
        
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **other_fields)
        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self, email, username, password, **other_fields):
        
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)
        
        return self.create_user(email, username, password, **other_fields)

class MyUser(AbstractBaseUser, PermissionsMixin):
    
    email = models.EmailField(unique = True)
    username = models.CharField(max_length = 255, unique = True)
    creation_date = models.DateField(default = timezone.now)
    is_staff = models.BooleanField(default = False)
    is_active = models.BooleanField(default = True)
    
    objects = CustomAccountManager()
    
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']
    
    def __str__(self):
        return self.username
    
class ShortLink(models.Model):
    
    short_url = models.CharField(max_length = 6)
    original_url = models.CharField(max_length = 355)
    user = models.ForeignKey(MyUser, on_delete = models.SET_NULL, null = True, blank = True)