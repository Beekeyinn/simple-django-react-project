from django.contrib import admin

from api.product.models import Product

# Register your models here.
class ProductAdmin(admin.ModelAdmin):
    list_display=['name','category','image','description','price','stock','created_at','updated_at','is_active']
    list_filter = ('is_active',)

    fieldsets = (
        (None, {
            "fields": (
                'name','category'
            ),
        }),
        ('Product Information',{'fields':('image','price','stock','description')}),
        ('Permissions',{'fields':('is_active',)})
    )
    

    ordering = ('name',)
admin.site.register(Product,ProductAdmin)