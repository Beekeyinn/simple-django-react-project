from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.decorators import login_required

from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
import braintree

# Create your views here.
gateway = braintree.BraintreeGateway(
    braintree.Configuration(
        braintree.Environment.Sandbox,
        merchant_id="mr3f4299gn59gg2t",
        public_key="fnxfnqzxqsjxs4rz",
        private_key="a8f1201b7b3a005dd2e3b3560dde6a05"
    )
)


def validate_user_session(id, token):
    User = get_user_model()
    try:
        user = User.objects.get(id=id)
        if user.session_token == token:
            return True
        else:
            return False
    except User.DoesNotExist:
        return False


@csrf_exempt
def generate_token(request, id, token):
    if not validate_user_session(id, token):
        return JsonResponse({
            'error': 'Invalid Session. Please login again!'
        })

    return JsonResponse({
        'clientToken': gateway.client_token.generate(),
        'success': True
    })


@csrf_exempt
def process_payment(request, id, token):
    if not validate_user_session(id, token):
        return JsonResponse({
            'error': 'Invalid Session. Please login again!'
        })

    nounce_from_client = request.POST.get('paymentMethodNounce')
    amount_from_client = request.POST.get('amount')
    print("NFC:",nounce_from_client)
    print("AFC",amount_from_client)

    result = gateway.transaction.sale({
        'amount': amount_from_client,
        'payment_method_nonce': nounce_from_client,
        'options': {
            'submit_for_settlement': True
        }
    })
    print("Result :",result)
    if result.is_success:
        return JsonResponse(
            {
                'success': result.is_success,
                'transaction':
                {
                    'id': result.transaction.id,
                    'amount': result.transaction.amount
                },
            })
    else:
        return JsonResponse({
            'error': True,
            'success': False
        })
