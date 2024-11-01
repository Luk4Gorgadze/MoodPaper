from django.urls import path
from .views import MoodWallpaperQuizView, MoodWallpaperView, FinishWallpaperPublicView, PublicMoodWallpapersView

urlpatterns = [
    path('mood-wallpaper-quiz/', MoodWallpaperQuizView.as_view(), name='mood_wallpaper_quiz'),
    path('mood-wallpaper/', MoodWallpaperView.as_view(), name='mood_wallpaper'),
    path('mood-wallpaper-finish/', FinishWallpaperPublicView.as_view(), name='mood-wallpaper-finish'),
    path('mood-wallpapers-public/', PublicMoodWallpapersView.as_view(), name='public-wallpapers'),
]
