# vite-plugin-nextcloud


## Install

```sh
yarn add vite vite-plugin-nextcloud -D
```

```sh
npm install vite vite-plugin-nextcloud --save-dev
```

## Usage

> vite.config.ts

```ts
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import { nextcloud } from 'vite-plugin-nextcloud'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    splitVendorChunkPlugin(),
    nextcloud({
      namespace: 'OCA\\MyApp'
    })
  ],
  base: './',
  build: {
    outDir: './js',
    minify: true,
    rollupOptions: {
      input: './src/main.ts'
    }
  }
})
```
