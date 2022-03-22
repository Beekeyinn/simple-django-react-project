from django.contrib import admin
from .models import Order
# Register your models here.


class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'product_names',
                    'total_product', 'transaction_id', 'total_amount']


admin.site.register(Order, OrderAdmin)
