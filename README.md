# MoodPaper Project 

helper commands for me:

[docker]
- docker compose up -d --build

[django session remove]
- # In Django admin shell (python manage.py shell)
from django.contrib.sessions.models import Session
Session.objects.all().delete()

