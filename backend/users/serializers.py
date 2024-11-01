# users/serializers.py
from rest_framework import serializers
from .models import User, Subscription


class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = ['subscription_type', 'tokens_count']
    
class UserSerializer(serializers.ModelSerializer):
    subscription = SubscriptionSerializer(read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'subscription')
