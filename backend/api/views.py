from django.shortcuts import render
import anthropic
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.

@api_view(['POST'])
def chat(request):
    print(request.data)
    messages = request.data.get('messages', [])
    user_key = request.data.get('api_key')
    if not messages:
        return Response({"error": "Message is required"}, status=400)

    # Call the Anthropic API
    response = "Hit the Django API: " + str(messages) + " with key: " + str(user_key)

    return Response(response)
