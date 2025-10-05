import { useEffect, useRef, useCallback } from 'react';
import { useSessionStore } from '../store/sessionStore';
import { WS_BASE_URL } from '../config/constants';

export const useWebSocket = (sessionId: string | null, role: 'presenter' | 'spectator') => {
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const {
    setCode,
    setLanguage,
    setConnected,
    setParticipantsCount,
    addChatMessage,
    setWebSocket,
  } = useSessionStore();

  const connect = useCallback(() => {
    if (!sessionId) return;

    console.log('🔌 Connecting to WebSocket...', sessionId, role);
    const ws = new WebSocket(`${WS_BASE_URL}/ws/${sessionId}?role=${role}`);
    wsRef.current = ws;
    setWebSocket(ws);

    ws.onopen = () => {
      console.log('✅ WebSocket connected');
      setConnected(true);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        switch (data.type) {
          case 'init':
            // Initialize session state
            setCode(data.session.code);
            setLanguage(data.session.language);
            setParticipantsCount(data.session.participants_count);
            break;
          
          case 'code_update':
            // Update code from presenter
            setCode(data.code);
            break;
          
          case 'user_joined':
          case 'user_left':
            setParticipantsCount(data.participants_count);
            break;
          
          case 'chat_message':
            console.log('📨 Received chat message:', data);
            addChatMessage({
              id: `${data.user}-${data.timestamp}-${Math.random()}`,
              user: data.user,
              message: data.message,
              timestamp: data.timestamp,
            });
            break;
          
          default:
            console.log('Unknown message type:', data.type);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setConnected(false);
      setWebSocket(null);
      
      // Attempt to reconnect after 3 seconds
      reconnectTimeoutRef.current = setTimeout(() => {
        console.log('Attempting to reconnect...');
        connect();
      }, 3000);
    };
  }, [sessionId, role, setCode, setLanguage, setConnected, setParticipantsCount, addChatMessage, setWebSocket]);

  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [connect]);

  const sendMessage = useCallback((message: any) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    }
  }, []);

  return { sendMessage, isConnected: wsRef.current?.readyState === WebSocket.OPEN };
};
