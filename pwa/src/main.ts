import { App as VueApp, createApp } from 'vue'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import 'uno.css'

import useAuthentication from './composables/useAuthentication'
import router from './bootstrap/router'
import useI18n from './composables/useI18n'
import useCustomUser from './composables/useCustomUser'
import RouteHolder from '../components/holders/RouteHolder.vue'
import { ref, watch } from 'vue'
import useSocket from './composables/useSocket'

const app: VueApp = createApp(App)
const { restoreUser, user } = useAuthentication()
const { customUser, loadCustomUser } = useCustomUser()
const { i18n, loadLocale } = useI18n()

loadLocale()
app.use(i18n)
;(async function () {
  await restoreUser()

  if (user.value) {
    await loadCustomUser()
    const { connectToServer, disconnectFromServer, connected } = useSocket()
    const connectedToServer = ref<boolean>(connected.value)
    watch(connectedToServer, () => {
      if (connectedToServer.value === true) {
        connectToServer()
      } else {
        disconnectFromServer()
      }
    })
    console.log('Connecting')
    connectToServer()
  }

  app.use(router)

  app.mount('#app')
})()
