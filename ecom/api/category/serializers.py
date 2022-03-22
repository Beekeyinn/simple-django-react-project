from rest_framework import serializers

from .models import Category

class CatogorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = ('id','name','description')