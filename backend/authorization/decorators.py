# decorators.py
from django.http import HttpResponseForbidden
from functools import wraps

from django.shortcuts import redirect

from users.models import UserAuthData

def kinde_authenticated(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        user_id = request.session.get('user_id')
        user_auth_data = UserAuthData.objects.filter(user__kinde_user_id=user_id).first()

        if user_auth_data and user_auth_data.authenticated:
            return view_func(request, *args, **kwargs)

        return redirect('login')
    
    return _wrapped_view
