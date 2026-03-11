from django.shortcuts import render
import anthropic
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings

client = anthropic.Anthropic(api_key=settings.ANTHROPIC_API_KEY)


@api_view(['POST'])
def chat(request):
    messages = request.data.get('messages', [])
    if not messages:
        return Response({"error": "Message is required"}, status=400)

    print("messages: ", messages)
    # Call the Anthropic API
    message = client.messages.create(
        model="claude-haiku-4-5",
        messages=messages,
        max_tokens=1024,
    )
    print("message: ", message.content[0].text)
    return Response({"reply": message.content[0].text})
