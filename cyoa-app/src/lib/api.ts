import type { Message } from '../types'

export async function sendMessage(messages: Message[], _apiKey: string) {
  await new Promise(res => setTimeout(res, 800))
  return {
    content: "Placeholder response from backend."
  }
}