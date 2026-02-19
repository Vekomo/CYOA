import Anthropic from '@anthropic-ai/sdk';
import { Injectable } from '@nestjs/common';
import { Message, Conversation } from './interfaces/chat.interfact'




@Injectable()
export class AppService {
  private client = new Anthropic({ apiKey : process.env.ANTHROPIC_API_KEY});
  private history: Message[] = [];
  
  async chat(message: string): Promise<string> {
    this.history.push({ role: 'user', content: message });
    const response = await this.client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 1024,
      system: [
        {
        "type" : "text",
         "text": "Your favorite color is white."
        },
        {
        "type" : "text",
         "text": "My name is Khan, and my favorite color is black."
        }
       ],
      messages: this.history,

    });

    const reply = (response.content[0] as any).text;
    this.history.push( {role: 'assistant', content: reply} );

    return reply;
  }
}
