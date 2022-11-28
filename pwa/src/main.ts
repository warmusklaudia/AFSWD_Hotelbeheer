import { App as VueApp, createApp } from 'vue'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import 'uno.css'

import useAuthentication from './composables/useAuthentication'
import router from './bootstrap/router'
import useI18n from './composables/useI18n'
import useCustomUser from './composables/useCustomUser'

const app: VueApp = createApp(App)
const { restoreUser, user } = useAuthentication()
const { customUser, loadCustomUser } = useCustomUser()
const { i18n, loadLocale } = useI18n()

loadLocale()
app.use(i18n)
;(async function () {
  await restoreUser()

  if (user.value) await loadCustomUser()

  app.use(router)

  app.mount('#app')
})()
