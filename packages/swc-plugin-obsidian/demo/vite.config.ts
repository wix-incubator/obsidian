import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import Inspect from 'vite-plugin-inspect'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      plugins: [
        [path.resolve('../target/wasm32-wasi/release/swc_plugin_obsidian.wasm'), {}]
      ],
      tsDecorators: true,
    }),
    Inspect(),
  ],
  resolve: {
    alias: {
      src: '/src',
    },
  },
  base: '/',
});
