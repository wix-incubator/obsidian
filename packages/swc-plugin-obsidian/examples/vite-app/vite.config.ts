import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import Inspect from 'vite-plugin-inspect'
// import obsidian from 'swc-plugin-obsidian/dist'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // (obsidian as any).default(), // UNCOMMENT TO TROUBLESHOOT
    Inspect(),
  ],
  resolve: {
    alias: {
      src: '/src',
    },
  },
  base: '/',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
  },
});
