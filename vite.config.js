import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/spirited-atlantis/',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 4096, // Optimize asset handling
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three', '@react-three/fiber'],
          ar: ['mind-ar-image-three']
        }
      }
    }
  },
  server: {
    https: true // Required for AR in dev
  }
})
