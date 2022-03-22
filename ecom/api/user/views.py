from urllib import response
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .serializers import UserSerializers
from . models import User
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import login, logout
import re

from.token_creator import generate_token

# Create your views here.


@csrf_exempt
def signin(request):
    if not request.method == 'POST':
        data = {
            'error': 'Send a request with valid parameter only'
        }
        return JsonResponse(data)
    username = request.POST.get('email', None)
    password = request.POST.get('password', None)
    # if not re.match("^[\w\.\+\-]+\@[\w]+\.[a-z]{2,3}$", username):
    #     data = {
    #         'error': 'Invalid Email'
    #     }
    #     return JsonResponse(data)
    # if not re.fullmatch(
    #     "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$",
    #         password):
    #     data = {
    #         'error': [
    #             "Invalid Password",
    #             "Password must be of at least 8 charector",
    #             "Password must contain at least one capital letter and digit"
    #         ]
    #     }
    #     return JsonResponse(data)
    User = get_user_model()
    try:
        user = User.objects.get(email=username)
        if user.check_password(password):
            user_dict = User.objects.filter(
                email=username).values().first()
            user_dict.pop('password', None)

            if user.session_token != '0':
                user.session_token = "0"
                user.save()
                return JsonResponse(
                    {'error': "Precious session exists"})
            token = generate_token()
            user.session_token = token
            user.save()
            login(request, user)
            return JsonResponse({
                'token': token,
                'user': user_dict
            })
        else:
            return JsonResponse({
                'error': "Invalid Password"
            })
    except User.DoesNotExist:
        return JsonResponse({'error': 'Invalid Credentials'})


def signout(request, id):
    logout(request)
    User = get_user_model()
    try:
        user = User.objects.get(pk=id)
        user.session_token = "0"
        user.save()
    except User.DoesNotExist:
        return JsonResponse({'error': "Invalid User Id"})
    return JsonResponse({'success': "Logout Success"})


class UserViewSet(viewsets.ModelViewSet):
    permission_classes_by_action = (AllowAny,)
    queryset = User.objects.all().order_by('id')
    serializer_class = UserSerializers

    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action]
        except KeyError:
            return [permission() for permission in self.permission_classes]
