from django.urls import path, include
from rest_framework import routers

from .views import OrderViewSet, add_order

router = routers.DefaultRouter()
router.register(r'', OrderViewSet)

urlpatterns = [
    path('add/<str:id>/<str:token>/', add_order, name="order_add"),
    path('', include(router.urls))
]
