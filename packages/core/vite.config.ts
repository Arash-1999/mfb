import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dts from 'vite-plugin-dts';
import { resolve, join, } from 'path';

import { peerDependencies } from './package.json';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), dts({rollupTypes: true,})],
  resolve: {
    alias: {
      "@": resolve(__dirname, './src'),
    }
  },
  build: {
    target: 'esnext',
    minify: false,
    lib: {
      entry: resolve(__dirname, join('src', 'index.ts')),
      fileName: 'index',
      name: '@mfb/core',
    },
    rollupOptions: {
      external: [...Object.keys(peerDependencies)],
      output: {
        globals: {
          react: 'React',
          'react-hook-form': 'RHF',
          'react-dom': 'ReactDOM',
        }
      }
    }
  }
})
