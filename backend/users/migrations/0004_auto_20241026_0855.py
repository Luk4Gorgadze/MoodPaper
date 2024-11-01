# Generated by Django 3.2.25 on 2024-10-26 08:55

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_user_kinde_client_data'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='kinde_client_data',
        ),
        migrations.CreateModel(
            name='UserAuthData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('access_token', models.TextField()),
                ('refresh_token', models.TextField()),
                ('authenticated', models.BooleanField(default=False)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='auth_data', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
