import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react-swc';
import Inspect from 'vite-plugin-inspect'
import swc from 'unplugin-swc'
import obsidian from '../src';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    swc.vite({
      jsc: {
        parser: {
          syntax: "typescript",
          decorators: true,
        },
        transform: {
          react: {
            runtime: "automatic",
          }
        },
        experimental: {
          runPluginFirst: true,
          plugins: [
            obsidian()
          ]
        }
      },
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
