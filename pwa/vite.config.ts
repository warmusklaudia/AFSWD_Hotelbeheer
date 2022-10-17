import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import { VitePluginFonts } from 'vite-plugin-fonts'

// https://vitejs.dev/config/
export default defineConfig({
  server: { host: '0.0.0.0' },
  plugins: [
    vue(),
    Unocss({
      theme: {
        colors: {
          'themeGreen': '#25321E',
          'themeBrown': '#AD8945',
        },
      },
      rules: [
        ['font-title', { 'font-family': 'Playfair Display, serif' }],
        ['font-text', { 'font-family': 'Lato, sans-serif' }],
        [
          /^text-(.*)$/,
          ([, c], { theme }) => {
            if (theme.colors[c]) return { color: theme.colors[c] }
          },
        ],
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
