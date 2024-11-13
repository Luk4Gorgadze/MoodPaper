from django.db import models
from users.models import User

# Create your models here.

class MoodWallpaper(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='wallpapers')
    title = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)
    questions = models.TextField(null=True, blank=True)
    answers = models.TextField(null=True, blank=True)
    width = models.IntegerField()
    height = models.IntegerField()
    is_public = models.BooleanField(default=False)
    image_url = models.URLField(max_length=500, null=True, blank=True)

    def __str__(self):
        return f"{self.title} by {self.author.username}"

    class Meta:
        ordering = ['-created_at']
