from django.shortcuts import render
from django.http import JsonResponse
from django.conf import settings
import json
import requests

from authorization.decorators import kinde_authenticated
from users.tasks import update_user_subscription


@kinde_authenticated
def create_order(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    # Parse request body
    try:
        body = json.loads(request.body)
        user_id = body.get('user_id')
        price = body.get('order_price')

        if not user_id or not price:
            return JsonResponse({'error': 'Missing user_id or price'}, status=400)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)

    # PayPal API endpoints
    PAYPAL_API_URL = 'https://api-m.sandbox.paypal.com' if settings.PAYPAL_SANDBOX else 'https://api-m.paypal.com'
    
    # Get access token
    auth_response = requests.post(
        f'{PAYPAL_API_URL}/v1/oauth2/token',
        auth=(settings.PAYPAL_CLIENT_ID, settings.PAYPAL_CLIENT_SECRET),
        data={'grant_type': 'client_credentials'}
    )
    
    access_token = auth_response.json()['access_token']

    # Create order
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {access_token}',
    }
    
    order_data = {
        'intent': 'CAPTURE',
        'purchase_units': [{
            'amount': {
                'currency_code': 'USD',
                'value': str(price)
            },
            'custom_id': str(user_id)
        }]
    }

    response = requests.post(
        f'{PAYPAL_API_URL}/v2/checkout/orders',
        headers=headers,
        json=order_data
    )

    print('backend create order response', response.json())

    return JsonResponse(response.json())

@kinde_authenticated
def capture_order(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    # Parse request body
    try:
        body = json.loads(request.body)
        order_id = body.get('order_id')
        subscription_type = body.get('subscription_type')
        user_id = body.get('user_id')

        if not order_id or not subscription_type or not user_id:
            return JsonResponse({'error': 'Missing order_id, subscription_type, or user_id'}, status=400)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)

    # PayPal API endpoints
    PAYPAL_API_URL = 'https://api-m.sandbox.paypal.com' if settings.PAYPAL_SANDBOX else 'https://api-m.paypal.com'
    
    # Get access token
    auth_response = requests.post(
        f'{PAYPAL_API_URL}/v1/oauth2/token',
        auth=(settings.PAYPAL_CLIENT_ID, settings.PAYPAL_CLIENT_SECRET),
        data={'grant_type': 'client_credentials'}
    )
    
    access_token = auth_response.json()['access_token']

    # Capture order
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {access_token}',
    }

    response = requests.post(
        f'{PAYPAL_API_URL}/v2/checkout/orders/{order_id}/capture',
        headers=headers
    )

    print('backend capture order response status code', response.status_code)

    if 200 <= response.status_code < 300:
        update_user_subscription(user_id, subscription_type)
    print('backend capture order response', response.json())

    return JsonResponse(response.json())
