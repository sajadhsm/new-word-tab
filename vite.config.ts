import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Components from 'unplugin-vue-components/vite';

import { r, port, isDev } from './scripts/utils';

export default defineConfig(({ command }) => ({
  plugins: [
    Vue(),
    Components({
      resolvers: [IconsResolver()],
    }),
    Icons({ autoInstall: true }),
  ],
  root: r('src'),
  resolve: {
    alias: {
      '@': r('src'),
    },
  },
  optimizeDeps: {
    include: ['vue', 'webextension-polyfill'],
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
    minify: 'terser',
    terserOptions: {
      mangle: false,
    },
    rollupOptions: {
      input: {
        newTab: r('src/newTab/index.html'),
        options: r('src/options/index.html'),
      },
    },
  },
}));
