from django.urls import path, include
from rest_framework.authtoken import views

from api.views import home

urlpatterns = [
    path('', home, name="home"),
    path('category/', include('api.category.urls')),
    path('products/', include('api.product.urls')),
    path('user/', include('api.user.urls')),
    # path('api-token-auth',views.obtain_auth_token,name="api_token_auth"), haven't used in this project but is used to create token in drf
    path('order/', include('api.order.urls')),
    path('payments/', include('api.payment.urls')),
]
