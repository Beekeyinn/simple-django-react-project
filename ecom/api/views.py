from django.http import JsonResponse
from django.shortcuts import render

# Create your views here.
def home(request):
    return JsonResponse({
        'info':"django react course",
        'name':"Beekeyinn"
        })