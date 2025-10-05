# LiveCode Session - Copilot Instructions

## Project Overview
LiveCode Session is a real-time collaborative code sharing platform that allows developers to share their coding sessions live with spectators.

## Tech Stack
### Backend
- FastAPI (Python web framework)
- WebSocket for real-time communication
- Pydantic for data validation
- Uvicorn as ASGI server

### Frontend
- React 18 with TypeScript
- Vite (build tool)
- @tanstack/react-router (routing)
- @tanstack/react-query (data fetching)
- Zustand (state management)
- Monaco Editor (code editor)
- WebSocket client for real-time updates

## Architecture
- **Session Management**: Each coding session has a unique ID
- **WebSocket Rooms**: Clients join rooms based on session ID
- **Role-based Access**: Presenter (read/write) vs Spectator (read-only)
- **Real-time Sync**: Code changes are broadcast via WebSocket with operational transforms

## Development Guidelines
- Use TypeScript for type safety
- Follow REST conventions for HTTP endpoints
- Use WebSocket events for real-time features
- Keep backend and frontend in separate directories
- Use environment variables for configuration
