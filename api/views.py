from django.shortcuts import render
import anthropic
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.

@api_view(['POST'])
def chat(request):
    user_message = request.data.get('message')
    user_key = request.data.get('key')
    if not user_message:
        return Response({"error": "Message is required"}, status=400)

    # Call the Anthropic API
    response = "Hit the Django API: " + user_message

    return Response(response)
