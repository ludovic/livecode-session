# 🚀 LiveCode Session

A real-time collaborative code sharing platform that allows developers to share their coding sessions live with spectators. Built with FastAPI (backend) and React (frontend).

## 🌟 Features

- **Real-time Code Synchronization**: See code changes appear instantly across all connected clients
- **WebSocket-based Communication**: Low-latency, persistent connections for smooth collaboration
- **Session Management**: Create unique sessions and share them via URL
- **Role-based Access**: 
  - **Presenter**: Full read/write access to the code editor
  - **Spectator**: Read-only view with real-time updates
- **Monaco Editor**: Powered by VS Code's editor with syntax highlighting
- **Live Chat**: Communicate with participants during the session
- **Multi-language Support**: JavaScript, TypeScript, Python, Java, C#, C++, Go, Rust, and more
- **Participant Tracking**: See how many users are connected to a session

## 🏗️ Architecture

### Backend (FastAPI)
- RESTful API for session management
- WebSocket endpoints for real-time synchronization
- Event-driven architecture for handling code updates, chat messages, and user presence
- In-memory session storage (can be extended with Redis/database)

### Frontend (React + TypeScript)
- **Vite**: Fast build tool and dev server
- **TanStack Router**: Type-safe routing
- **TanStack Query**: Server state management
- **Zustand**: Client state management
- **Monaco Editor**: Professional code editor
- **WebSocket Client**: Real-time communication layer

## 📋 Prerequisites

- **Backend**: Python 3.9+
- **Frontend**: Node.js 18+ and npm
- Git

## 🚀 Quick Start

### 1. Clone the Repository

\`\`\`bash
git clone <your-repo-url>
cd "LiveCode Session"
\`\`\`

### 2. Backend Setup

\`\`\`bash
cd backend

# Create a virtual environment (optional but recommended)
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\\Scripts\\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file (optional)
cp .env.example .env

# Run the server
python main.py
\`\`\`

The backend will be available at `http://localhost:8000`

### 3. Frontend Setup

\`\`\`bash
cd frontend

# Install dependencies
npm install

# Create .env file (optional)
cp .env.example .env

# Run the development server
npm run dev
\`\`\`

The frontend will be available at `http://localhost:5173`

## 📖 Usage

### Creating a Session

1. Open the frontend at `http://localhost:5173`
2. Enter your name and select a programming language
3. Click "Create Session"
4. You'll be redirected to your coding session with a unique URL
5. Share the URL with spectators!

### Joining as a Spectator

1. Get the session link from the presenter
2. Open the link in your browser
3. You'll see the code editor in read-only mode
4. Watch code changes appear in real-time

### Using the Chat

- Click the chat panel to send messages
- All participants can see chat messages
- Messages are synchronized in real-time

## 🔧 Configuration

### Backend (.env)

\`\`\`env
HOST=0.0.0.0
PORT=8000
CORS_ORIGINS=http://localhost:5173
\`\`\`

### Frontend (.env)

\`\`\`env
VITE_API_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000
\`\`\`

## 📡 API Documentation

### REST Endpoints

- `GET /` - Health check
- `POST /sessions` - Create a new session
  - Body: `{ "presenter_name": "John", "language": "javascript" }`
- `GET /sessions/{session_id}` - Get session details
- `DELETE /sessions/{session_id}` - Delete a session

### WebSocket Events

**Connect**: `WS /ws/{session_id}?role=presenter|spectator`

**Client → Server Events**:
- `code_update` - Send code changes (presenter only)
- `cursor_position` - Share cursor position
- `chat_message` - Send a chat message

**Server → Client Events**:
- `init` - Initial session state
- `code_update` - Code was updated
- `user_joined` - User joined the session
- `user_left` - User left the session
- `cursor_position` - Cursor position update
- `chat_message` - New chat message

## 🛠️ Development

### Backend Development

\`\`\`bash
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
\`\`\`

### Frontend Development

\`\`\`bash
cd frontend
npm run dev
\`\`\`

### Building for Production

**Backend**:
\`\`\`bash
# Install production dependencies
pip install -r requirements.txt

# Run with gunicorn (or similar)
uvicorn main:app --host 0.0.0.0 --port 8000
\`\`\`

**Frontend**:
\`\`\`bash
cd frontend
npm run build
npm run preview
\`\`\`

## 🚀 Deployment

### Deploy to Railway (Recommended)

Railway provides free hosting with WebSocket support - perfect for this app!

**Quick Deploy:**
1. Push your code to GitHub
2. Go to [Railway.app](https://railway.app)
3. Click "Start a New Project" → "Deploy from GitHub repo"
4. Select your repo
5. Railway will auto-deploy both backend and frontend

**Detailed instructions:** See [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md)

### Alternative Platforms

- **Render.com** - Full-stack hosting with WebSocket support
- **Fly.io** - Edge deployment with WebSocket
- **DigitalOcean App Platform** - Container-based deployment

**Note:** Vercel and Netlify don't support WebSocket, so they're not suitable for the backend.

## 🧪 Testing

The application supports manual testing:

1. Open two browser windows
2. Create a session in one window (as presenter)
3. Copy the session link and open it in the second window (as spectator)
4. Type in the presenter window and see changes appear in the spectator window

## 🎯 Future Enhancements

- [ ] **Shared Terminal**: Execute commands and share output with Xterm.js
- [ ] **Persistent Storage**: Save sessions to a database
- [ ] **User Authentication**: Secure sessions with authentication
- [ ] **File Explorer**: Support multiple files in a session
- [ ] **Collaborative Cursors**: See where other users are typing
- [ ] **Session Recording**: Record and replay coding sessions
- [ ] **Voice/Video Chat**: Integrate WebRTC for audio/video
- [ ] **Code Execution**: Run code directly in the browser
- [ ] **Themes**: Light/dark mode and custom editor themes

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## 📄 License

MIT License - feel free to use this project for learning and commercial purposes.

## 🙏 Acknowledgments

- Built with [FastAPI](https://fastapi.tiangolo.com/)
- UI powered by [React](https://react.dev/)
- Code editor by [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- Routing by [TanStack Router](https://tanstack.com/router)
- Data fetching by [TanStack Query](https://tanstack.com/query)
- State management by [Zustand](https://github.com/pmndrs/zustand)

---

**Enjoy coding together! 🎉**
