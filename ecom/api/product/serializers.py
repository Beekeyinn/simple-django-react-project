from rest_framework import serializers
from .models import Product
class ProductSerializer(serializers.HyperlinkedModelSerializer):
    image = serializers.ImageField(max_length=None, allow_empty_file=False, use_url=True,allow_null=True, required=False)
    class Meta:
        model = Product
        fields = ('id','name','category','price','image','stock','description')