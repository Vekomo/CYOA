import type { Message } from '../types'

export async function sendMessage(messages: Message[], _apiKey: string) {
  if (!_apiKey) {
    _apiKey = 'placeholder_api_key';
  }
  const response = await fetch('http://localhost:8000/api/chat/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ messages , api_key: _apiKey}),
  })

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  const data = await response.json();
  console.log('API response:', data);
  return { content: data, error: null };
}