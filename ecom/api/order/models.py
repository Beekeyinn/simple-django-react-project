from django.db import models
from api.user.models import User
from api.product.models import Product

# Create your models here.

class Order(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="user")
    product_names = models.CharField(max_length=500)
    total_product = models.CharField(max_length=50, default=0)
    transaction_id = models.CharField(max_length=250, default=0)
    total_amount = models.CharField(max_length=50, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
