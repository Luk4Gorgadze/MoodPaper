from django.urls import path
from . import views

urlpatterns = [
    path('create-order/', views.create_order, name='create_order'),
    path('capture-order/', views.capture_order, name='capture_order'),
]
