import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    host: true,
    port: 8080,
    strictPort: false,
    allowedHosts: true,
  },
  server: {
    host: true,
    port: 5173,
  }
})
