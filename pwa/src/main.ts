import { App as VueApp, createApp } from 'vue'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import 'uno.css'

import useAuthentication from './composables/useAuthentication'
import router from './bootstrap/router'
import useI18n from './composables/useI18n'

const app: VueApp = createApp(App)
const { i18n, loadLocale } = useI18n()
const { restoreUser } = useAuthentication()

loadLocale()
app.use(i18n)

;(async () => {
  await restoreUser()

  app.use(router)

  app.mount('#app')
})()
