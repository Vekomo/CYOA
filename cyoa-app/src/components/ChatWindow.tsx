import { useEffect, useRef } from 'react'
import { useAppSelector } from '../store/hooks'
import MessageBubble from './MessageBubble'
import ChatInput from './ChatInput'

export default function ChatWindow() {
  const messages = useAppSelector(state => state.chat.messages)
  const bottomRef = useRef<HTMLDivElement>(null) 

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        {messages.map(msg => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        <div ref={bottomRef} />
      </div>
      <ChatInput />
    </div>
  )
}