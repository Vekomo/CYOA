import type { Message } from '../types'

export async function sendMessage(messages: Message[]) {
  console.log('Sending messages to backend:', messages);
  const response = await fetch('http://localhost:8000/api/chat/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ messages }),
  })

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  const data = await response.json();
  console.log("Received response from backend:", data);
  return { content: data.reply, error: null };
}