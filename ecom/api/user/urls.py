from rest_framework import routers
from django.urls import path, include

from .views import UserViewSet, signin, signout

router = routers.DefaultRouter()
router.register(r'',UserViewSet,basename="user")

urlpatterns = [
    path('login/',signin,name="signin"),
    path('<int:id>/logout/',signout,name="signout"),
    path('',include(router.urls))
]
