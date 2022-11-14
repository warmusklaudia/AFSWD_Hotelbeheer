import { App as VueApp, createApp } from 'vue'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import 'uno.css'

import useAuthentication from './composables/useAuthentication'
import router from './bootstrap/router'

const app: VueApp = createApp(App)
const { restoreUser } = useAuthentication()

;(async () => {
  await restoreUser()

  app.use(router)

  app.mount('#app')
})()
