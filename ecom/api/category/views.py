from rest_framework import viewsets
from .serializers import CatogorySerializer
from .models import Category
# Create your views here.
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by('name')
    serializer_class = CatogorySerializer