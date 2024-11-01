from django.contrib.auth.models import AbstractUser
from django.db import models
from .constants import SubscriptionEnum  # Import the Enum
# Create your models here.
class User(AbstractUser):
    kinde_user_id = models.CharField(max_length=255, unique=True, null=True, blank=False)
    def __str__(self):
        return self.username


class UserAuthData(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='auth_data')
    access_token = models.TextField()
    refresh_token = models.TextField()
    authenticated = models.BooleanField(default=False)

    def __str__(self):
        return f"KindeUserAuthData for {self.user.email}"


class Subscription(models.Model):

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='subscription')
    subscription_type = models.CharField(
        max_length=10,
        choices=[(type.name, type.value) for type in SubscriptionEnum],
        default=SubscriptionEnum.FREE.name
    )
    tokens_count = models.IntegerField(default=0)
    
    def __str__(self):
        return f"{self.user.username}'s {self.subscription_type} Subscription (Tokens: {self.tokens_count})"
