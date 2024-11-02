import random
import string
from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from users.models import User, UserAuthData
from .utils.auth import kinde_client
from django.middleware.csrf import get_token
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.urls import reverse
from users.serializers import UserSerializer
from users.constants import FREE_TOKEN_COUNT, SubscriptionEnum
from users.models import Subscription
def __get_user_context(user):
    auth_data = UserAuthData.objects.filter(user=user).first()
    if user and auth_data:
        return {
            "authenticated": user.auth_data.authenticated,
            "user_first_name": user.first_name,
            "user_last_name": user.last_name,
            "user_email": user.email,
            "user_full_name": f"{user.first_name} {user.last_name}",
            "user_initials": f"{user.first_name[0]}{user.last_name[0]}",
        }
    return {"authenticated": False}



def index(request):
    user_id = request.session.get('user_id')
    user = User.objects.filter(kinde_user_id=user_id).first() if user_id else None
    context = __get_user_context(user)
    return render(request, "authorization/index.html", context)

def login(request):
    if request.session.get('user_id') is None:
        login_url = kinde_client.get_login_url()
        response = JsonResponse({'redirect_url': login_url})
        response.set_cookie('auth_pending', 'true', max_age=300, httponly=False, samesite='Lax')
        return response
    return JsonResponse({'redirect_url': '/'})

def register(request):
    if not request.session.get('user_id'):
        register_url = kinde_client.get_register_url()
        response = JsonResponse({'redirect_url': register_url})
        response.set_cookie('auth_pending', 'true', max_age=300, httponly=False, samesite='Lax')
        return response
    return JsonResponse({'redirect_url': '/'})

def generate_random_username():
    adjectives = ['happy', 'clever', 'brave', 'kind', 'swift', 'calm', 'bright']
    nouns = ['panda', 'tiger', 'eagle', 'dolphin', 'wolf', 'fox', 'owl']
    
    adjective = random.choice(adjectives)
    noun = random.choice(nouns)
    number = ''.join(random.choices(string.digits, k=4))
    username = f"{adjective}-{noun}-{number}"
    return username
    

def callback(request):
    if not request.session.get('user_id'):
        kinde_client.fetch_token(authorization_response=request.build_absolute_uri())
        user_details = kinde_client.get_user_details()

        user_id = user_details['id']
        email = user_details.get('email', '')

        # Check if user exists
        user = User.objects.filter(kinde_user_id=user_id).first()
        
        if not user:
            # Only create if user doesn't exist
            user = User.objects.create(
                kinde_user_id=user_id,
                username=generate_random_username(),
                first_name=user_details['given_name'],
                last_name=user_details['family_name'],
                email=email,
            )
            UserAuthData.objects.create(
                user=user,
                authenticated=True
            )
            Subscription.objects.create(
                user=user,
                subscription_type=SubscriptionEnum.FREE.name,
                tokens_count=FREE_TOKEN_COUNT
            )
        else:
            user.auth_data.authenticated = True
            user.auth_data.save()

        request.session['user_id'] = user_id

    return HttpResponseRedirect(request.build_absolute_uri(reverse('set_auth_cookies')))

def set_auth_cookies(request):
    frontend_url = settings.FRONTEND_URL
    
    # Create redirect response
    response = HttpResponseRedirect(frontend_url)
    
    # Set cookies with 1 year expiration
    csrf_token = get_token(request)
    response.set_cookie('csrftoken', csrf_token, max_age=31536000, domain='localhost', samesite='Lax', path='/')
    response.set_cookie('sessionid', request.session.session_key, max_age=31536000, domain='localhost', samesite='Lax', path='/')
    response.delete_cookie('auth_pending')
    
    # Set custom header for Nginx to handle redirect properly
    # response['X-Accel-Redirect'] = frontend_url
    
    return response

def logout(request):
    user_id = request.session.get('user_id')
    user_auth_data = UserAuthData.objects.filter(user__kinde_user_id=user_id).first()
    frontend_url = settings.FRONTEND_URL

    if user_auth_data:
        user_auth_data.authenticated = False
        user_auth_data.access_token = ""
        user_auth_data.refresh_token = ""
        user_auth_data.save()

        request.session.flush()
    
    # Get the Kinde logout URL
    logout_url = kinde_client.logout(redirect_to=frontend_url)
    
    # Return JSON response with the redirect URL
    return JsonResponse({'redirect_url': logout_url})

def csrf_token_view(request):
    token = get_token(request)
    return JsonResponse({'csrfToken': token})

def get_user_info(request):
    user_id = request.session.get('user_id')
    user = User.objects.filter(kinde_user_id=user_id).first() if user_id else None
    if user:
        serializer = UserSerializer(user)
        return JsonResponse(serializer.data)
    return JsonResponse({'error': 'User not found'}, status=404)
