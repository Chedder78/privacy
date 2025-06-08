import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mindAR from 'vite-plugin-mindar';

export default defineConfig({
  plugins: [
    react(),
    mindAR({ 
      imgtargets: ['public/targets/target.png'] 
    })
  ],
  base: './', // Critical for asset loading
  build: {
    assetsInlineLimit: 0 // Disable asset inlining
  }
});
