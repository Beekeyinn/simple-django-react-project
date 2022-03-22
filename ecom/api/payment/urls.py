from django.urls import path, include
from .views import generate_token, process_payment

urlpatterns = [
    path(
        'gettoken/<str:id>/<str:token>/', generate_token,
        name="token_generate"),
    path(
        'processpayment/<str:id>/<str:token>/',
        process_payment, name="payment_process"), ]
