# 🚀 LiveCode Session

A real-time collaborative code sharing platform that allows developers to share their coding sessions live with spectators. Built with FastAPI (backend) and React (frontend).

## ✨ Features

- 📝 **Real-time Code Collaboration**: Share your code with multiple spectators in real-time
- 🎨 **Syntax Highlighting**: Powered by Monaco Editor with support for multiple languages
- 👥 **Role-based Access**: Presenter (read/write) vs Spectator (read-only)
- 🔄 **Live Synchronization**: WebSocket-based real-time updates
- 🌐 **Multi-language Support**: Python, JavaScript, TypeScript, and more

## 🌐 Live Demo

**Frontend**: https://livecode-session.up.railway.app/  
**Backend API**: https://livecode-session-production.up.railway.app  
**API Docs**: https://livecode-session-production.up.railway.app/docs

## 🏗️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **WebSocket** - Real-time bidirectional communication
- **Uvicorn** - Lightning-fast ASGI server
- **Pydantic** - Data validation

### Frontend
- **React 18** with TypeScript
- **Vite** - Next generation frontend tooling
- **TanStack Router** - Type-safe routing
- **TanStack Query** - Powerful data synchronization
- **Zustand** - Lightweight state management
- **Monaco Editor** - VS Code's editor in the browser

## 🚀 Deployment

This application is deployed on **Railway** with automatic deployments from GitHub.

### Backend (FastAPI)
- **Platform**: Railway with Railpack
- **URL**: https://livecode-session-production.up.railway.app
- **WebSocket**: wss://livecode-session-production.up.railway.app
- **Root Directory**: `backend`

### Frontend (React)
- **Platform**: Railway with Railpack
- **URL**: https://livecode-session.up.railway.app
- **Build**: Vite production build
- **Server**: Vite preview server
- **Root Directory**: `frontend`

### Environment Variables

**Frontend** (set in Railway Variables):
```
VITE_API_URL=https://livecode-session-production.up.railway.app
VITE_WS_URL=wss://livecode-session-production.up.railway.app
```

## 🛠️ Local Development

### Prerequisites
- Python 3.9+
- Node.js 18+
- npm or yarn

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`
- API docs (Swagger): `http://localhost:8000/docs`
- Health check: `http://localhost:8000/health`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Environment Variables (Local)

Create `.env` in the frontend directory:
```
VITE_API_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000
```

## 📁 Project Structure

```
livecode-session/
├── backend/                 # FastAPI backend
│   ├── main.py             # Main application entry
│   ├── requirements.txt    # Python dependencies
│   └── railway.toml        # Railway backend config
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Page components
│   │   ├── routes/         # Router configuration
│   │   └── store/          # Zustand state management
│   ├── railway.toml        # Railway frontend config
│   ├── vite.config.ts      # Vite configuration
│   └── .env.production     # Production environment variables
└── README.md
```

## 🔌 API Endpoints

### REST API

- `POST /sessions` - Create a new session
- `GET /sessions/{session_id}` - Get session details
- `PUT /sessions/{session_id}` - Update session code
- `GET /health` - Health check endpoint

### WebSocket

- `WS /ws/{session_id}/{role}` - Connect to session
  - Events: `init`, `code_update`, `cursor_move`
  - Roles: `presenter` or `spectator`

## 🏛️ Architecture

### Session Management
- Each coding session has a unique ID
- Sessions are stored in-memory (can be extended to use a database)

### WebSocket Rooms
- Clients join rooms based on session ID
- Real-time synchronization using WebSocket events

### Role-based Access
- **Presenter**: Full read/write access to the code
- **Spectator**: Read-only access with real-time updates

### Real-time Synchronization
- Code changes are broadcast via WebSocket
- All connected clients receive updates instantly

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Monaco Editor by Microsoft
- FastAPI by Sebastián Ramírez
- Railway for hosting

---

**Enjoy coding together! 🎉**
