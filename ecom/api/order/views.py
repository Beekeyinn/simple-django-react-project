from rest_framework import viewsets
from django.http import JsonResponse
from django.contrib.auth import get_user_model

from .serializers import OrderSerializer
from .models import Order
from django.views.decorators.csrf import csrf_exempt
# Create your views here.


def validate_user_session(user_id, token):
    User = get_user_model()
    try:
        user = User.objects.get(id=user_id)
        if user.session_token == token:
            return True
        else:
            return False
    except User.DoesNotExist:
        return False


@csrf_exempt
def add_order(request, id, token):
    if not validate_user_session(id, token):
        return JsonResponse({
            'error': 'Please re-login',
            'code': '1'
        })
    if request.method == 'POST':
        user_id = id
        transaction_id = request.POST.get('transaction_id')
        amount = request.POST.get('amount')
        products = request.POST.get('products')
        total_prod = len(products.split(',')[:-1])

        User = get_user_model()

        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return JsonResponse({
                'error': 'User doesnot Exist'
            })
        order = Order(
            user=user,
            product_names=products,
            total_product=total_prod,
            transaction_id=transaction_id,
            total_amount=amount
                      )
        order.save()
        return JsonResponse({
            'success': True,
            'error': False,
            'msg': "Order Placed Successfully"
        })


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by('-id')
    serializer_class = OrderSerializer
