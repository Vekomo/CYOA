import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Message } from '../types'
import { sendMessage } from '../lib/api'

export const sendMessageThunk = createAsyncThunk(
    'chat/sendMessage',
    async({ messages, apiKey }: { messages: Message[]; apiKey: string }) => {
        // Placeholder for sending a message to the backend and receiving a response
        const response = await sendMessage(messages, apiKey);
        return response;
    }
);

interface ChatState {
    messages: Message[];
    isLoading: boolean;
    error: string | null;
}

const initialState: ChatState = {
    messages: [],
    isLoading: false,
    error: null,
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        // Synchronous action - add message directly
        addMessage: (state, action: PayloadAction<Message>) => {
            state.messages.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendMessageThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(sendMessageThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.messages.push({
                    id: crypto.randomUUID(),
                    role: 'assistant',
                    content: action.payload,
                    timestamp: Date.now(),
                });
            })
            .addCase(sendMessageThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Something went wrong';
            })
    }
})

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;