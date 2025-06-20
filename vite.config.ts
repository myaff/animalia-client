import { fileURLToPath, URL } from 'node:url';
import Unfonts from 'unplugin-fonts/vite';

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import vueDevTools from 'vite-plugin-vue-devtools'
import path from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // vueDevTools(),
    Unfonts({
      google: {
        preconnect: false,
        families: [
          {
            name: 'Roboto',
            styles: 'ital,wght@0,400;1,200',
            defer: false,
          },
          {
            name: 'Material+Symbols+Rounded',
            styles: 'opsz,wght,FILL,GRAD@24,400,0,0',
            defer: false,
          },
        ]
      }
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  css: {
    preprocessorOptions: {
      styl: {
        includePaths: ['*.styl'],
        additionalData: `@import '${path.resolve(__dirname, './src/assets/styles/imports')}'`,
      },
    },
  },
})
