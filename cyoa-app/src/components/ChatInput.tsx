import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { addMessage, sendMessageThunk } from '../store/chatSlice'

export default function ChatInput() {
  const [text, setText] = useState('')   
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(state => state.chat.isLoading)

  function handleSubmit() {
    if (!text.trim() || isLoading) return

    const userMessage = {
      role: 'user' as const,
      content: text
    }

    dispatch(addMessage(userMessage))        
    dispatch(sendMessageThunk({             
      messages: [userMessage]
    }))

    setText('')
  }

  return (
    <div style={{ display: 'flex', gap: '8px', padding: '16px' }}>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit()
          }
        }}
        placeholder="What do you do?"
        rows={2}
        style={{ flex: 1, resize: 'none', padding: '8px', borderRadius: '8px' }}
      />
      <button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? '...' : 'Send'}
      </button>
    </div>
  )
}