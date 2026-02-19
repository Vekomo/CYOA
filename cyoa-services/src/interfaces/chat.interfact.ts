export type MessageRole = 'user' | 'assistant';

export interface Message {
    role: MessageRole;
    content: string;
}

export interface Conversation {
    id: string;
    messages: Message[];
    createAt: Date;
}