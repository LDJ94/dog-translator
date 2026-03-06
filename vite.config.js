import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
<<<<<<< HEAD
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
=======
    port: 5173,
    host: true
>>>>>>> c7dfee4daf7d2a508ae354230d23a0b9b1b9d269
  }
})
