import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react-swc';
import Inspect from 'vite-plugin-inspect'
import path from 'path'
import swc from 'unplugin-swc'

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
            [path.resolve('../target/wasm32-wasi/release/swc_plugin_obsidian.wasm'), {}]
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
