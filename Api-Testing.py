from openai import OpenAI

client = OpenAI(api_key='sk-AmBf79DZk7nduLo1U6EoJWXSBM2jCvrjIYp7UN2hyQT3BlbkFJxVl87b2KF6rYGKOH9TJ6yvtL6w2UAV9YDCiutw-RAA',
                organization='org-338tNlxiF8taHLDjeaCzqyIN',
                project='proj_NctbUldhN8m913ouUFExhYc7')

response = client.images.generate(
  model="dall-e-3",
  prompt="Create a high quality wallpaper based on my mood: never give up, mecha, futuristic, cyberpunk",
  size="1792x1024",
  quality="standard",
  n=1,
)

image_url = response.data[0].url
print(image_url)