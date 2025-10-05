import { useState } from 'react';
import { useSessionStore } from '../store/sessionStore';

interface ChatPanelProps {
  onSendMessage: (message: string) => void;
}

export const ChatPanel = ({ onSendMessage }: ChatPanelProps) => {
  const [message, setMessage] = useState('');
  const { chatMessages, participantsCount } = useSessionStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="chat-panel">
      <div className="chat-header">
        <h3>💬 Chat</h3>
        <span className="participants-count">
          {participantsCount} participant{participantsCount !== 1 ? 's' : ''}
        </span>
      </div>
      
      <div className="chat-messages">
        {chatMessages.length === 0 ? (
          <div className="no-messages">No messages yet. Start the conversation!</div>
        ) : (
          chatMessages.map((msg) => (
            <div key={msg.id} className="chat-message">
              <div className="message-header">
                <span className="message-user">{msg.user}</span>
                <span className="message-time">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <div className="message-content">{msg.message}</div>
            </div>
          ))
        )}
      </div>
      
      <form className="chat-input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="chat-input"
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};
