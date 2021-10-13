import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import { r, port, isDev } from './scripts/utils';

export default defineConfig(({ command }) => ({
  plugins: [vue()],
  root: r('src'),
  resolve: {
    alias: {
      '@': r('src'),
    },
  },
  optimizeDeps: {
    include: ['vue'],
  },
  base: command === 'serve' ? `http://localhost:${port}/` : '/dist/',
  server: {
    port,
    hmr: {
      host: 'localhost',
    },
  },
  build: {
    outDir: r('extension/dist'),
    emptyOutDir: false,
    sourcemap: isDev ? 'inline' : false,
    terserOptions: {
      mangle: false,
    },
    rollupOptions: {
      input: {
        newTab: r('src/newTab/index.html'),
      },
    },
  },
}));
