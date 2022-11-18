import { App as VueApp, createApp } from 'vue'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import 'uno.css'

import useAuthentication from './composables/useAuthentication'
import router from './bootstrap/router'
import useCustomUser from './composables/useCustomUser'

const app: VueApp = createApp(App)
const { restoreUser, user } = useAuthentication()
const { customUser, loadCustomUser } = useCustomUser()

;(async () => {
  await Promise.all([restoreUser() /*, loadCustomUser(user.value!.uid*/])

  // await restoreUser().then(async () => {
  //   if (user.value) await loadCustomUser(user.value!.uid)
  // })

  app.use(router)

  app.mount('#app')
})()
