from multiprocessing.sharedctypes import Value
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin,BaseUserManager

# Create your models here
class UserManager(BaseUserManager):
    def create_user(self, email, username, password=None, is_active=False):
        if not email:
            raise ValueError("Email Address is required.")
        if not username:
            raise ValueError("Name is required.")
        if not password:
            raise ValueError("Password is required.")
        user =  self.model(
            email = self.normalize_email(email),
            username=username
        )
        user.set_password(password)
        user.is_active = is_active
        user.save(using=self._db)
        return user

    def create_superuser(self, email,username, password=None,is_active=True):
        user = self.create_user(
                email=email,
                username = username,
                password = password,
                is_active=is_active,
            )
        user.is_staff = True
        user.is_admin = True
        user.is_superuser = True
        user.save(using=self._db)
        return user



class User(AbstractBaseUser,PermissionsMixin):
    GENDERS = [
        ('Male','Male'),
        ('Female','Female'),
        ('Others','Others')
    ]
    username = models.CharField(max_length=50, default="Anonymous")
    email = models.EmailField(max_length=255, unique=True)
    phone = models.CharField(max_length=20,blank=True,null=True)
    gender = models.CharField(max_length=10, choices=GENDERS, null=True, blank=True)
    session_token = models.CharField(max_length=10, default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    is_active = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = UserManager()
