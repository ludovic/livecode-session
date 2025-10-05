import { API_BASE_URL } from '../config/constants';

export interface Session {
  id: string;
  presenter_name: string;
  language: string;
  code: string;
  created_at: string;
  participants_count: number;
}

export interface CreateSessionRequest {
  presenter_name: string;
  language: string;
}

export const api = {
  createSession: async (data: CreateSessionRequest): Promise<Session> => {
    const response = await fetch(`${API_BASE_URL}/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create session');
    }

    return response.json();
  },

  getSession: async (sessionId: string): Promise<Session> => {
    const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch session');
    }

    return response.json();
  },

  deleteSession: async (sessionId: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete session');
    }
  },
};
