import { Injectable } from '@nestjs/common';
import { Message } from './interfaces/chat.interfact'



@Injectable()
export class ContextService { 


    public compress(messageHistory: Message[]): Message[] {
        // Take messages
        // Exclude first message, and go until the length of the message length - 2,
        // Send a request to compress
        // Replace with summary.
        
        return messageHistory;

    

    }


}
