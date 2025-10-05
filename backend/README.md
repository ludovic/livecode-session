# LiveCode Session - Backend

FastAPI backend with WebSocket support for real-time code collaboration.

## Features

- REST API for session management
- WebSocket endpoints for real-time synchronization
- Session-based room management
- Role-based access (Presenter vs Spectator)
- Real-time code updates with change broadcasting
- Participant tracking

## Installation

```bash
pip install -r requirements.txt
```

## Running the Server

```bash
# Development mode with auto-reload
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Or using Python
python main.py
```

## API Endpoints

### REST API

- `GET /` - Health check
- `POST /sessions` - Create a new session
- `GET /sessions/{session_id}` - Get session details
- `DELETE /sessions/{session_id}` - Delete a session

### WebSocket

- `WS /ws/{session_id}?role=presenter|spectator` - Connect to a session

## WebSocket Events

### Client → Server

- `code_update` - Update code (presenter only)
- `cursor_position` - Share cursor position
- `chat_message` - Send chat message

### Server → Client

- `init` - Initial session state
- `code_update` - Code changed
- `user_joined` - User joined session
- `user_left` - User left session
- `cursor_position` - Cursor position update
- `chat_message` - Chat message
