import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3500'
        // changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/socket': {
        target: 'http://localhost:3001',
        ws: false,
        changeOrigin: true
      }
    }
  },
  css: {
    devSourcemap: true
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src')
    }
  }
})
