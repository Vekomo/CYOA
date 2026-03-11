import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Message } from '../types'
import { sendMessage } from '../lib/api'

// createAsyncThunk handles the async lifecycle for you:
// pending → fulfilled → rejected, automatically
export const sendMessageThunk = createAsyncThunk(
  'chat/sendMessage',
  async ({ messages }: { messages: Message[]}) => {
    const response = await sendMessage(messages)
    return response // this becomes `action.payload` in fulfilled
  }
)

interface ChatState {
  messages: Message[]
  isLoading: boolean
  error: string | null
}

const initialState: ChatState = {
  messages: [],
  isLoading: false,
  error: null
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // Regular synchronous actions
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload) 
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessageThunk.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(sendMessageThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.messages.push({
          role: 'assistant',
          content: action.payload.content
        })
      })
      .addCase(sendMessageThunk.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message ?? 'Something went wrong'
      })
  }
})

export const { addMessage } = chatSlice.actions
export default chatSlice.reducer