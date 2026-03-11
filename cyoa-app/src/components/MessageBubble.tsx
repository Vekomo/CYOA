import type { Message } from '../types'

interface Props {
  message: Message
}

export default function MessageBubble({ message }: Props) {
  const isUser = message.role === 'user'

  return (
    <div style={{
      display: 'flex',
      justifyContent: isUser ? 'flex-end' : 'flex-start',
      marginBottom: '12px'
    }}>
      <div style={{
        maxWidth: '70%',
        padding: '10px 14px',
        borderRadius: '12px',
        background: isUser ? '#2563eb' : '#1e1e1e',
        color: 'white'
      }}>
        {message.content}
      </div>
    </div>
  )
}