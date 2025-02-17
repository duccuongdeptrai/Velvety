import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL,
        changeOrigin: true,
        secure: false,
      }, // Proxy all requests starting with "/api" to the backend
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
