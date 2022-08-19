import { defineConfig, splitVendorChunkPlugin } from 'vite'
import vue from '@vitejs/plugin-vue'

// import { assetsManifestPlugin as nextcloud } from './nextcloud-vite.ts'
import { nextcloud } from 'vite-plugin-nextcloud'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    splitVendorChunkPlugin(),
    nextcloud({
      namespace: 'OCA\\TimerApp'
    })
  ],
  base: './',
  build: {
    outDir: './js',
    rollupOptions: {
      input: './src/main.ts'
    }
  }
})
