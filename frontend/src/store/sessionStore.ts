import { create } from 'zustand';

export interface Participant {
  id: string;
  name: string;
  role: 'presenter' | 'spectator';
}

export interface ChatMessage {
  id: string;
  user: string;
  message: string;
  timestamp: string;
}

export interface SessionState {
  sessionId: string | null;
  role: 'presenter' | 'spectator';
  code: string;
  language: string;
  participants: Participant[];
  participantsCount: number;
  chatMessages: ChatMessage[];
  isConnected: boolean;
  ws: WebSocket | null;

  // Actions
  setSessionId: (id: string) => void;
  setRole: (role: 'presenter' | 'spectator') => void;
  setCode: (code: string) => void;
  setLanguage: (language: string) => void;
  addParticipant: (participant: Participant) => void;
  removeParticipant: (id: string) => void;
  setParticipantsCount: (count: number) => void;
  addChatMessage: (message: ChatMessage) => void;
  setConnected: (connected: boolean) => void;
  setWebSocket: (ws: WebSocket | null) => void;
  reset: () => void;
}

const initialState = {
  sessionId: null,
  role: 'spectator' as const,
  code: '',
  language: 'javascript',
  participants: [],
  participantsCount: 0,
  chatMessages: [],
  isConnected: false,
  ws: null,
};

export const useSessionStore = create<SessionState>((set) => ({
  ...initialState,

  setSessionId: (id) => set({ sessionId: id }),
  setRole: (role) => set({ role }),
  setCode: (code) => set({ code }),
  setLanguage: (language) => set({ language }),
  
  addParticipant: (participant) =>
    set((state) => ({
      participants: [...state.participants, participant],
    })),
  
  removeParticipant: (id) =>
    set((state) => ({
      participants: state.participants.filter((p) => p.id !== id),
    })),
  
  setParticipantsCount: (count) => set({ participantsCount: count }),
  
  addChatMessage: (message) =>
    set((state) => ({
      chatMessages: [...state.chatMessages, message],
    })),
  
  setConnected: (connected) => set({ isConnected: connected }),
  setWebSocket: (ws) => set({ ws }),
  
  reset: () => set(initialState),
}));
