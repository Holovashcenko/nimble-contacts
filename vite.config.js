import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    cors: false,
    proxy: {
      '/api': {
        target: 'https://live.devnimble.com/',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
})
