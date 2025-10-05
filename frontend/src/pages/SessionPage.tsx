import { useEffect, useState } from 'react';
import { useParams, useSearch } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { CodeEditor } from '../components/CodeEditor';
import { ChatPanel } from '../components/ChatPanel';
import { useWebSocket } from '../hooks/useWebSocket';
import { useSessionStore } from '../store/sessionStore';
import { api } from '../api/sessions';

export const SessionPage = () => {
  const { sessionId } = useParams({ strict: false }) as { sessionId: string };
  const search = useSearch({ strict: false }) as { role?: 'presenter' | 'spectator' };
  const role = search.role || 'spectator';
  const [showChat, setShowChat] = useState(true);

  const { setSessionId, setRole, setCode, setLanguage, isConnected } = useSessionStore();
  
  const { data: session, isLoading, error } = useQuery({
    queryKey: ['session', sessionId],
    queryFn: () => api.getSession(sessionId),
    enabled: !!sessionId,
  });

  const { sendMessage } = useWebSocket(sessionId, role);

  useEffect(() => {
    if (sessionId) {
      setSessionId(sessionId);
      setRole(role);
    }
  }, [sessionId, role, setSessionId, setRole]);

  useEffect(() => {
    if (session) {
      setCode(session.code);
      setLanguage(session.language);
    }
  }, [session, setCode, setLanguage]);

  const handleCodeChange = (code: string) => {
    if (role === 'presenter') {
      sendMessage({
        type: 'code_update',
        code,
      });
      setCode(code);
    }
  };

  const handleChatMessage = (message: string) => {
    const userName = role === 'presenter' ? session?.presenter_name : 'Spectator';
    
    // Just send to server - it will broadcast to everyone including us
    sendMessage({
      type: 'chat_message',
      message,
      user: userName,
    });
  };

  const copySessionLink = () => {
    const link = `${window.location.origin}/session/${sessionId}?role=spectator`;
    navigator.clipboard.writeText(link);
    alert('Session link copied to clipboard!');
  };

  if (isLoading) {
    return <div className="loading">Loading session...</div>;
  }

  if (error) {
    return <div className="error">Error loading session. Please check the session ID.</div>;
  }

  return (
    <div className="session-container">
      <div className="session-header">
        <div className="session-info">
          <h2>{session?.presenter_name}'s Session</h2>
          <button onClick={copySessionLink} className="copy-link-button">
            📋 Copy Link
          </button>
        </div>
        <div className="session-controls">
          <button onClick={() => setShowChat(!showChat)} className="toggle-chat-button">
            {showChat ? '🗨️ Hide Chat' : '💬 Show Chat'}
          </button>
          <div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
            {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
          </div>
        </div>
      </div>

      <div className="session-content">
        <div className={`editor-wrapper ${showChat ? 'with-chat' : 'full-width'}`}>
          <CodeEditor sessionId={sessionId} role={role} onCodeChange={handleCodeChange} />
        </div>
        
        {showChat && (
          <div className="chat-wrapper">
            <ChatPanel onSendMessage={handleChatMessage} />
          </div>
        )}
      </div>
    </div>
  );
};
