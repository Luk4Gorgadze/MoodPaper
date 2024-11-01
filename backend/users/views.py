from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse

from .models import User,Subscription
from .serializers import SubscriptionSerializer
from authorization.decorators import kinde_authenticated

# Create your views here.
from .constants import (
    SubscriptionEnum,
)

@api_view(['GET'])
@kinde_authenticated
def get_user_subscription(request):
    user_id = request.session.get('user_id')
    user = User.objects.filter(kinde_user_id=user_id).first()
    try:
        subscription = user.subscription
    except User.subscription.RelatedObjectDoesNotExist:
        subscription = Subscription.objects.create(
            user=user, 
            subscription_type=SubscriptionEnum.FREE.name, 
            tokens_count=0
        )
    data = SubscriptionSerializer(subscription).data
    return Response(data)  # Changed to Response since we're using DRF


