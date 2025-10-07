"""
LiveCode Session - FastAPI Backend
Main application entry point with WebSocket support for real-time code collaboration.
"""
import os
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Set, Optional
import uuid
import json
from datetime import datetime
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan event handler for startup and shutdown"""
    # Startup
    port = os.getenv("PORT", "8000")
    env = os.getenv("RAILWAY_ENVIRONMENT", "local")
    print(f"🚀 LiveCode Session Backend starting on port {port}")
    print(f"📊 Environment: {env}")
    print(f"💾 Sessions initialized: 0")
    
    yield
    
    # Shutdown
    print("👋 Shutting down LiveCode Session Backend")

app = FastAPI(title="LiveCode Session API", lifespan=lifespan)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data Models
class SessionCreate(BaseModel):
    presenter_name: str
    language: str = "javascript"

class Session(BaseModel):
    id: str
    presenter_name: str
    language: str
    code: str
    created_at: datetime
    participants_count: int = 0

class CodeUpdate(BaseModel):
    session_id: str
    code: str
    changes: Optional[Dict] = None

# In-memory storage (in production, use Redis or a database)
sessions: Dict[str, Session] = {}
session_connections: Dict[str, Set[WebSocket]] = {}

# REST Endpoints
@app.get("/")
async def root():
    """Health check endpoint"""
    return {"status": "ok", "message": "LiveCode Session API is running"}

@app.get("/health")
async def health_check():
    """Health check endpoint for Railway"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "sessions": len(sessions),
        "port": os.getenv("PORT", "8000")
    }

@app.post("/sessions", response_model=Session)
async def create_session(session_data: SessionCreate):
    """Create a new coding session"""
    session_id = str(uuid.uuid4())
    session = Session(
        id=session_id,
        presenter_name=session_data.presenter_name,
        language=session_data.language,
        code="",
        created_at=datetime.now()
    )
    sessions[session_id] = session
    session_connections[session_id] = set()
    return session

@app.get("/sessions/{session_id}", response_model=Session)
async def get_session(session_id: str):
    """Get session details"""
    if session_id not in sessions:
        raise HTTPException(status_code=404, detail="Session not found")
    return sessions[session_id]

@app.delete("/sessions/{session_id}")
async def delete_session(session_id: str):
    """Delete a session"""
    if session_id not in sessions:
        raise HTTPException(status_code=404, detail="Session not found")
    
    # Close all WebSocket connections
    if session_id in session_connections:
        for ws in list(session_connections[session_id]):
            await ws.close()
        del session_connections[session_id]
    
    del sessions[session_id]
    return {"message": "Session deleted successfully"}

# WebSocket Connection Manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, Set[WebSocket]] = {}
        self.connection_roles: Dict[WebSocket, str] = {}
    
    async def connect(self, websocket: WebSocket, session_id: str, role: str = "spectator"):
        """Connect a new WebSocket client to a session"""
        await websocket.accept()
        
        if session_id not in self.active_connections:
            self.active_connections[session_id] = set()
        
        self.active_connections[session_id].add(websocket)
        self.connection_roles[websocket] = role
        
        # Update participant count
        if session_id in sessions:
            sessions[session_id].participants_count = len(self.active_connections[session_id])
    
    def disconnect(self, websocket: WebSocket, session_id: str):
        """Disconnect a WebSocket client from a session"""
        if session_id in self.active_connections:
            self.active_connections[session_id].discard(websocket)
            
            if websocket in self.connection_roles:
                del self.connection_roles[websocket]
            
            # Update participant count
            if session_id in sessions:
                sessions[session_id].participants_count = len(self.active_connections[session_id])
            
            # Clean up empty sessions
            if len(self.active_connections[session_id]) == 0:
                del self.active_connections[session_id]
    
    async def broadcast(self, message: dict, session_id: str, exclude: Optional[WebSocket] = None):
        """Broadcast a message to all clients in a session"""
        if session_id not in self.active_connections:
            return
        
        disconnected = []
        for connection in self.active_connections[session_id]:
            if connection == exclude:
                continue
            try:
                await connection.send_json(message)
            except:
                disconnected.append(connection)
        
        # Clean up disconnected clients
        for connection in disconnected:
            self.disconnect(connection, session_id)
    
    async def send_personal_message(self, message: dict, websocket: WebSocket):
        """Send a message to a specific client"""
        try:
            await websocket.send_json(message)
        except:
            pass

manager = ConnectionManager()

# WebSocket Endpoint
@app.websocket("/ws/{session_id}")
async def websocket_endpoint(websocket: WebSocket, session_id: str, role: str = "spectator"):
    """
    WebSocket endpoint for real-time code synchronization
    
    Query parameters:
    - role: "presenter" or "spectator" (default: "spectator")
    """
    # Validate session exists
    if session_id not in sessions:
        await websocket.close(code=4004, reason="Session not found")
        return
    
    await manager.connect(websocket, session_id, role)
    
    try:
        # Send current session state to the newly connected client
        await manager.send_personal_message({
            "type": "init",
            "session": sessions[session_id].model_dump(mode='json'),
            "role": role
        }, websocket)
        
        # Notify other participants
        await manager.broadcast({
            "type": "user_joined",
            "participants_count": sessions[session_id].participants_count,
            "timestamp": datetime.now().isoformat()
        }, session_id, exclude=websocket)
        
        # Listen for messages
        while True:
            data = await websocket.receive_json()
            event_type = data.get("type")
            
            if event_type == "code_update":
                # Only presenters can update code
                if manager.connection_roles.get(websocket) == "presenter":
                    code = data.get("code", "")
                    changes = data.get("changes")
                    
                    # Update session code
                    sessions[session_id].code = code
                    
                    # Broadcast to all spectators
                    await manager.broadcast({
                        "type": "code_update",
                        "code": code,
                        "changes": changes,
                        "timestamp": datetime.now().isoformat()
                    }, session_id, exclude=websocket)
            
            elif event_type == "cursor_position":
                # Broadcast cursor position to other participants
                await manager.broadcast({
                    "type": "cursor_position",
                    "position": data.get("position"),
                    "user": data.get("user", "anonymous"),
                    "timestamp": datetime.now().isoformat()
                }, session_id, exclude=websocket)
            
            elif event_type == "chat_message":
                # Broadcast chat message to all participants (including sender)
                await manager.broadcast({
                    "type": "chat_message",
                    "message": data.get("message"),
                    "user": data.get("user", "anonymous"),
                    "timestamp": datetime.now().isoformat()
                }, session_id)
    
    except WebSocketDisconnect:
        manager.disconnect(websocket, session_id)
        
        # Notify other participants
        if session_id in sessions:
            await manager.broadcast({
                "type": "user_left",
                "participants_count": sessions[session_id].participants_count,
                "timestamp": datetime.now().isoformat()
            }, session_id)
    
    except Exception as e:
        print(f"WebSocket error: {e}")
        manager.disconnect(websocket, session_id)

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        reload=True  # Enable reload for local development
    )
