import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { api } from '../api/sessions';

export const HomePage = () => {
  const navigate = useNavigate();
  const [presenterName, setPresenterName] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [joinSessionId, setJoinSessionId] = useState('');

  const createSessionMutation = useMutation({
    mutationFn: api.createSession,
    onSuccess: (session) => {
      navigate({ to: '/session/$sessionId', params: { sessionId: session.id }, search: { role: 'presenter' } });
    },
  });

  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (presenterName.trim()) {
      createSessionMutation.mutate({ presenter_name: presenterName, language });
    }
  };

  const handleJoinSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (joinSessionId.trim()) {
      navigate({ to: '/session/$sessionId', params: { sessionId: joinSessionId }, search: { role: 'spectator' } });
    }
  };

  return (
    <div className="home-container">
      <div className="hero">
        <h1>🚀 LiveCode Session</h1>
        <p>Share your code in real-time with spectators</p>
      </div>

      <div className="actions-container">
        <div className="action-card">
          <h2>Create a Session</h2>
          <p>Start coding and share your screen with others</p>
          
          <form onSubmit={handleCreateSession}>
            <div className="form-group">
              <label htmlFor="presenterName">Your Name</label>
              <input
                id="presenterName"
                type="text"
                value={presenterName}
                onChange={(e) => setPresenterName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="language">Language</label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="csharp">C#</option>
                <option value="cpp">C++</option>
                <option value="go">Go</option>
                <option value="rust">Rust</option>
              </select>
            </div>

            <button
              type="submit"
              className="primary-button"
              disabled={createSessionMutation.isPending}
            >
              {createSessionMutation.isPending ? 'Creating...' : 'Create Session'}
            </button>
          </form>
        </div>

        <div className="divider">OR</div>

        <div className="action-card">
          <h2>Join a Session</h2>
          <p>Enter a session ID to spectate</p>
          
          <form onSubmit={handleJoinSession}>
            <div className="form-group">
              <label htmlFor="sessionId">Session ID</label>
              <input
                id="sessionId"
                type="text"
                value={joinSessionId}
                onChange={(e) => setJoinSessionId(e.target.value)}
                placeholder="Enter session ID"
                required
              />
            </div>

            <button type="submit" className="secondary-button">
              Join Session
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
