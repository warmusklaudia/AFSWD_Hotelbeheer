import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from '@unocss/vite'
import { VitePluginFonts } from 'vite-plugin-fonts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Unocss({
      rules: [
        ['font-title', { 'font-family': 'Playfair Display, serif' }],
        ['font-text', { 'font-family': 'Lato, sans-serif' }],
      ],
    }),
    VitePluginFonts({
      google: {
        injectTo: 'head',
        families: ['Lato', 'Playfair Display'],
      },
    }),
  ],
})
