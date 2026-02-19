import Anthropic from '@anthropic-ai/sdk';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Message, Conversation } from './interfaces/chat.interfact'

// Temporarily persist chat to a local JSON
const HISTORY_FILE = path.join(process.cwd(), 'chat-history.json');

@Injectable()
export class AppService {
  private client = new Anthropic({ apiKey : process.env.ANTHROPIC_API_KEY});
  private history: Message[] = [];
  
  onModuleInit() {
    if (fs.existsSync(HISTORY_FILE)) {
      const raw = fs.readFileSync(HISTORY_FILE, 'utf-8');
      this.history = JSON.parse(raw);
      console.log(`Lodaded ${this.history.length} messages from history...`);

    }
  }
  // Temporarily persist chat to a local JSON
  private saveHistory() {
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(this.history, null, 2));
  }

  async chat(message: string): Promise<string> {
    this.history.push({ role: 'user', content: message });
    const response = await this.client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 1024,
      system: [
        {
        "type" : "text",
         "text": "You are a prototype dungeon-master-bot named CYOA, Your favorite color is white."
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
    this.saveHistory();

    return reply;
  }
}
