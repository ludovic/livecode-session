# LiveCode Session - Frontend

React-based frontend for the LiveCode Session platform with real-time code collaboration.

## Tech Stack

- **React 19** with TypeScript
- **Vite** - Fast build tool and dev server
- **TanStack Router** - Type-safe routing
- **TanStack Query** - Server state management
- **Zustand** - Client state management
- **Monaco Editor** - VS Code's editor for the web
- **WebSocket** - Real-time communication

## Features

- 🎨 Modern, dark-themed UI
- 💻 Professional code editor with syntax highlighting
- 🔄 Real-time code synchronization
- 💬 Live chat functionality
- 👥 Participant tracking
- 📱 Responsive design

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Project Structure

```
src/
├── api/              # API client functions
│   └── sessions.ts
├── components/       # React components
│   ├── CodeEditor.tsx
│   └── ChatPanel.tsx
├── config/          # Configuration
│   └── constants.ts
├── hooks/           # Custom React hooks
│   └── useWebSocket.ts
├── pages/           # Page components
│   ├── HomePage.tsx
│   └── SessionPage.tsx
├── store/           # Zustand stores
│   └── sessionStore.ts
├── main.tsx         # App entry point
├── routeTree.tsx    # Route configuration
└── index.css        # Global styles
```

## Environment Variables

Create a `.env` file:

```env
VITE_API_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000
```

## Usage

1. **Create a session**: Enter your name and select a language
2. **Share the link**: Copy the session URL and share with spectators
3. **Code together**: Type in the editor and see changes sync in real-time
4. **Chat**: Use the chat panel to communicate with participants
