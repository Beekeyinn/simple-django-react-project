from django.urls import include, path
from rest_framework import routers
from api.product.views import ProductViewSets


router = routers.DefaultRouter()
router.register(r'',ProductViewSets,basename="products")

urlpatterns = [
    path("",include(router.urls))
]
