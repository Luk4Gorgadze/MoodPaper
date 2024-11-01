from django.contrib import admin
from .models import Subscription, User, UserAuthData

# Register your models here.

admin.site.register(Subscription)

admin.site.register(User)

admin.site.register(UserAuthData)


