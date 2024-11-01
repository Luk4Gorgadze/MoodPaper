from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login, name="login"),
    path("callback", views.callback, name="callback"),
    path("logout", views.logout, name="logout"),
    path("register", views.register, name="register"),
    path("csrf-token", views.csrf_token_view, name="csrf-token"),
    path("set-auth-cookies", views.set_auth_cookies, name="set_auth_cookies"),
    path("user-info", views.get_user_info, name="user-info"),
]
