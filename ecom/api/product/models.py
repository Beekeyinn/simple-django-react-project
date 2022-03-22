from unicodedata import category
from django.db import models

from api.product.file_upload import upload_image_path
from api.category.models import Category
# Create your models here.
class ProductQuerySet(models.query.QuerySet):
    def active(self):
        return self.filter(is_active=True)


class ProductManager(models.Manager):
    def get_queryset(self):
        return ProductQuerySet(self.model,using=self._db)

    def all(self):
        return self.get_queryset().active()

class Product(models.Model):
    name        = models.CharField(max_length=50)
    description = models.TextField()
    price       = models.CharField(max_length=50)
    stock       = models.CharField(max_length=50)
    image       = models.ImageField(upload_to=upload_image_path, blank=True, null=True)
    category    = models.ForeignKey(Category,related_name="category",on_delete=models.SET_NULL,blank=True, null=True)
    created_at  = models.DateTimeField(auto_now_add=True)
    updated_at  = models.DateTimeField(auto_now=True)   
    is_active   = models.BooleanField(default=False)

    objects = ProductManager()

    def __str__(self):
        return self.name