from django.urls import path
from . import views

urlpatterns = [
    path('subscription/', views.get_user_subscription, name='get_user_subscription'),
]
