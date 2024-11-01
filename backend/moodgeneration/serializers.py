from rest_framework import serializers
from .models import MoodWallpaper
class MoodWallpaperSerializerView(serializers.Serializer):
    asked_questions = serializers.ListField(
        child=serializers.CharField(),
        min_length=1,
        required=True
    )
    answers = serializers.ListField(
        child=serializers.CharField(allow_blank=True),
        min_length=0,
        required=False
    )
    width = serializers.IntegerField(required=True)
    height = serializers.IntegerField(required=True)
    style = serializers.CharField(required=False)


class MoodWallpaperSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='author.username', read_only=True)
    width = serializers.IntegerField(read_only=True)
    height = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = MoodWallpaper
        fields = ['id', 'created_at', 'author', 'username', 'title', 'width', 'height', 'is_public', 'image_url']
        read_only_fields = ['created_at']
