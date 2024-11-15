import json
import time
from django.http import JsonResponse
from django.views import View
from openai import OpenAI
import random
import os
from django.utils.decorators import method_decorator
import requests
import cloudinary.uploader
import cloudinary
from rest_framework.pagination import PageNumberPagination

from authorization.decorators import kinde_authenticated
from .serializers import MoodWallpaperSerializerView, MoodWallpaperSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from users.models import User
from moodgeneration.models import MoodWallpaper
from users.models import Subscription
from .constants import default_questions, questions
# Set your OpenAI API key
client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),
)

# Add this near your other configurations (e.g., where you configure OpenAI)
cloudinary.config( 
    cloud_name = os.environ.get('CLOUDINARY_NAME'),
    api_key = os.environ.get('CLOUDINARY_API_KEY'),
    api_secret = os.environ.get('CLOUDINARY_API_SECRET')
)

def get_chat_completion(prompt, model="gpt-3.5-turbo"):
    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            model=model,
        )
        return chat_completion.choices[0].message.content
    except Exception as e:
        raise Exception(f"Error in chat completion: {str(e)}")

@method_decorator(kinde_authenticated, name='get')
class MoodWallpaperQuizView(View):
    def get(self, request):
        try:
            # Validate user and subscription
            self._validate_user_and_subscription(request)
            
            # Generate questions
            questions_list = self._generate_questions()
            
            return JsonResponse({"questions": questions_list})

        except ValueError as e:
            return JsonResponse({"error": str(e)}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    def _validate_user_and_subscription(self, request):
        user_id = request.session.get('user_id')
        user = User.objects.filter(kinde_user_id=user_id).first()
        subscription = Subscription.objects.filter(user=user).first()

        if not subscription:
            raise ValueError("You have no subscription")
            
        return user, subscription

    def _generate_questions(self):
        try:
            total_questions = len(questions)
            used_indices = set()
            selected_questions = []
            
            while len(selected_questions) < 5 and len(used_indices) < total_questions:
                # Get random index that hasn't been used
                idx = random.randint(0, total_questions - 1)
                if idx in used_indices:
                    continue
                    
                used_indices.add(idx)
                question = questions[idx].copy()  # Shallow copy to avoid modifying original
                
                # Remove number and dot prefix from question text
                cleaned_question = ' '.join(question['question'].split('.')[1:]).strip()
                
                # If question is not empty, add it to selected questions
                if cleaned_question:
                    question['question'] = cleaned_question
                    selected_questions.append(question)
            
            # If we couldn't get 5 valid questions, fall back to defaults
            if len(selected_questions) < 5:
                return default_questions
                
            return selected_questions
            
        except Exception as e:
            print(f"Error selecting questions: {str(e)}")
            return default_questions

@method_decorator(kinde_authenticated, name='post')
class MoodWallpaperView(APIView):
    def post(self, request):
        try:
            # Validate user and subscription
            user, subscription = self._validate_user_and_subscription(request)
            
            # Validate and extract request data
            data = self._validate_request_data(request)
            
            # Generate mood analysis and DALL-E prompt
            dalle_prompt, wallpaper_title, wallpaper_description = self._generate_prompts(data)
            
            # Generate and upload image
            cloudinary_url = self._generate_and_upload_image(
                dalle_prompt, 
                data['width'], 
                data['height']
            )
            
            # Save wallpaper
            wallpaper = self._save_wallpaper(
                user, 
                wallpaper_title, 
                wallpaper_description,
                data['asked_questions'],
                data['answers'],
                data['width'], 
                data['height'], 
                cloudinary_url
            )
            
            # Update subscription tokens only after everything else succeeds
            self._update_subscription(subscription)
            
            return Response(
                MoodWallpaperSerializer(wallpaper).data, 
                status=status.HTTP_201_CREATED
            )
            
        except ValueError as e:
            return JsonResponse({"error": str(e)}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    def _validate_user_and_subscription(self, request):
        user_id = request.session.get('user_id')
        user = User.objects.filter(kinde_user_id=user_id).first()
        subscription = Subscription.objects.filter(user=user).first()

        if subscription and subscription.tokens_count <= 0:
            raise ValueError("You have no tokens left")
            
        return user, subscription

    def _validate_request_data(self, request):
        print(request.data)
        serializer = MoodWallpaperSerializerView(data=request.data)
        if not serializer.is_valid():
            raise ValueError(serializer.errors)
        return serializer.validated_data

    def _generate_prompts(self, data):
        # Generate mood character analysis
        
        print(data['asked_questions'])
        print(data['answers'])
        mood_character = (
            f"Analyze the following user responses:\n"
            f"Questions: {data['asked_questions']}\n"
            f"Answers: {data['answers']}\n\n"
            "Provide a concise psychological profile of the user's current emotional state and personality traits. "
            "Focus on key emotional indicators, mood patterns, and character traits. "
            "Format your response as a clear, comma-separated list of traits and emotional states. "
            "Extract meaningful elements from their answers (like colors, environments, natural elements, symbols, etc.) "
            "that reflect their emotional state, whether directly mentioned or implied.\n"
            "Result format should be like: {\"mood_values\": \"energetic, optimistic, creative, seeking growth, socially connected\", "
            "\"elements\": \"ocean waves, warm sunset, gentle breeze\"}"
        )
        mood_character_result = get_chat_completion(mood_character)

        print(mood_character_result)

        # Updated DALL-E prompt generation
        mood_prompt = (
            f"Create a detailed prompt for DALL-E 3 to generate an artistic wallpaper based on this mood profile: {mood_character_result}\n"
            f"The user has specifically requested a {data['style']} style.\n"
            "Requirements:\n"
            "- Create a highly detailed, professional quality artistic composition\n"
            "- Use sophisticated color theory that matches the emotional state\n"
            f"- Maintain the requested {data['style']} style throughout the composition\n"
            "- Incorporate symbolic elements and metaphors that represent the mood\n"
            "- Ensure the composition works well as a wallpaper (balanced, not too busy)\n"
            "- Do not include any text in the image\n"
            "- Include specific artistic techniques (lighting, texture, perspective) that enhance the emotional impact\n\n"
            "Your result should be in this JSON format: {\n"
            "  \"prompt\": \"your detailed image generation prompt here\",\n"
            "  \"title\": \"a creative but concise title that captures the mood\",\n"
            "  \"description\": \"a brief 1-2 sentence description of the wallpaper's mood and key elements\"\n"
            "}"
        )
        mood_result = get_chat_completion(mood_prompt)

        print(mood_result)

        try:
            result_dict = json.loads(mood_result)
            return result_dict['prompt'], result_dict['title'], result_dict['description']
        except json.JSONDecodeError:
            raise ValueError("Failed to parse AI response")

    def _generate_and_upload_image(self, prompt, width, height):
        # Generate image using DALL-E
        response = client.images.generate(
            model="dall-e-3",
            prompt=prompt,
            size=f"{width}x{height}",
            quality="standard",
            n=1,
        )
        
        # Upload to Cloudinary
        cloudinary_response = cloudinary.uploader.upload(
            response.data[0].url,
            folder="mood_wallpapers",
            resource_type="image",
            quality="auto",
            fetch_format="auto",
            flags="lossy",
            transformation=[{
                'quality': 'auto:good',
                'fetch_format': 'auto'
            }]
        )
        
        return cloudinary_response['secure_url']

    def _save_wallpaper(self, user, title, description, questions, answers, width, height, image_url):
        # Convert lists to strings using json.dumps
        questions_str = json.dumps(questions)
        answers_str = json.dumps(answers)
        
        wallpaper = MoodWallpaper(
            author=user,
            title=title,
            description=description,
            questions=questions_str,
            answers=answers_str,
            width=width,
            height=height,
            image_url=image_url
        )
        wallpaper.save()
        return wallpaper

    def _update_subscription(self, subscription):
        subscription.tokens_count -= 1
        subscription.save()

@method_decorator(kinde_authenticated, name='post')
class FinishWallpaperPublicView(APIView):
    def post(self, request):
        try:
            # Validate request data using serializer
            serializer = MoodWallpaperSerializer(data=request.data)
            if not serializer.is_valid():
                return Response(
                    serializer.errors, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            print(request.data)
            # Get user_id first
            user_id = request.session.get('user_id')
            # Then use it to get the user
            user = User.objects.filter(kinde_user_id=user_id).first()
            
            wallpaper_id = request.data['id']
            is_public = request.data['is_public']

            # Get the wallpaper and verify ownership
            wallpaper = MoodWallpaper.objects.filter(id=wallpaper_id).first()
            
            if not wallpaper:
                return Response(
                    {"error": "Wallpaper not found"}, 
                    status=status.HTTP_404_NOT_FOUND
                )
                
            if wallpaper.author != user:
                return Response(
                    {"error": "You don't have permission to modify this wallpaper"}, 
                    status=status.HTTP_403_FORBIDDEN
                )
            
            # Toggle the is_public flag
            wallpaper.is_public = is_public
            wallpaper.save()
            
            # Return the updated wallpaper using the serializer
            return Response(
                MoodWallpaperSerializer(wallpaper).data, 
                status=status.HTTP_200_OK
            )
            
        except Exception as e:
            return Response(
                {"error": str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 16  # Changed to 9 items per page
    page_size_query_param = 'page_size'
    max_page_size = 16  # Also set max_page_size to 9 to enforce this limit

# @method_decorator(kinde_authenticated, name='get')
class PublicMoodWallpapersView(APIView):
    pagination_class = StandardResultsSetPagination

    def get(self, request):
        try:
            # Get width and height from query params
            width = request.query_params.get('width')
            height = request.query_params.get('height')
            
            # Start with base query
            public_wallpapers = MoodWallpaper.objects.filter(is_public=True)
            
            # Apply dimension filtering if provided
            if width and height:
                public_wallpapers = public_wallpapers.filter(
                    width=width,
                    height=height
                )
            
            public_wallpapers = public_wallpapers.order_by('-created_at')
            
            # Initialize paginator and serialize
            paginator = self.pagination_class()
            paginated_wallpapers = paginator.paginate_queryset(public_wallpapers, request)
            serializer = MoodWallpaperSerializer(paginated_wallpapers, many=True)
            
            return paginator.get_paginated_response(serializer.data)
            
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

@method_decorator(kinde_authenticated, name='get')
class PersonalMoodWallpapersView(APIView):
    pagination_class = StandardResultsSetPagination

    def get(self, request):
        try:
            # Get width and height from query params
            width = request.query_params.get('width')
            height = request.query_params.get('height')
            
            user_id = request.session.get('user_id')
            user = User.objects.filter(kinde_user_id=user_id).first() 
            
            # Start with base query
            personal_wallpapers = MoodWallpaper.objects.filter(author=user)
            
            # Apply dimension filtering if provided
            if width and height:
                personal_wallpapers = personal_wallpapers.filter(
                    width=width,
                    height=height
                )
            
            personal_wallpapers = personal_wallpapers.order_by('-created_at')
            
            # Initialize paginator and serialize
            paginator = self.pagination_class()
            paginated_wallpapers = paginator.paginate_queryset(personal_wallpapers, request)
            serializer = MoodWallpaperSerializer(paginated_wallpapers, many=True)
            
            return paginator.get_paginated_response(serializer.data)
            
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

