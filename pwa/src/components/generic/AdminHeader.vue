<template>
  <header class="flex flex-col">
    <div class="relative flex w-full justify-between">
      <route-holder :title="name" />
      <div
        @click=";[notificationFalse(), togglePopup()]"
        class="bg-themeGreen col-end-3 flex h-12 w-12 cursor-pointer items-center justify-center justify-self-end rounded-full text-white shadow-md hover:opacity-90 md:col-end-7 md:h-14 md:w-14 lg:col-end-8 lg:h-16 lg:w-16"
      >
        <bell v-if="!notifications" />
        <bell-ring v-if="notifications" />
        <div
          v-if="notifications"
          class="absolute ml-4 mt-4 h-2 w-2 animate-ping rounded-full bg-red-500 opacity-60"
        ></div>
        <div
          v-if="notifications"
          class="absolute ml-4 mt-4 h-2 w-2 rounded-full bg-red-600"
        ></div>
      </div>
    </div>
    <div class="absolute right-6 z-30 place-self-end" v-if="showPopup">
      <notification-card
        :reservation="newReservation"
        :requestedService="newRequestedService"
        :togglePopup="() => togglePopup()"
      />
    </div>
  </header>
</template>

<script lang="ts">
import { BellRing, Bell } from 'lucide-vue-next'
import { ref } from 'vue'
import RouteHolder from '../../components/holders/RouteHolder.vue'
import useSocket from '../../composables/useSocket'
import NotificationCard from '../../components/notifications/NotificationCard.vue'
import { Reservation } from '../../interfaces/interface.reservation'
import { useQuery } from '@vue/apollo-composable'
import { GET_ROOMS_WITHOUT_RESERVATION } from '../../graphql/query.room'
import { GET_UNRESOLVED_SERVICES } from '../../graphql/query.requestedService'
import {
  GET_RESERVATIONS,
  GET_RESERVATIONS_WITH_BREAKFAST,
} from '../../graphql/query.reservation'
import { GET_CLEANINGS } from '../../graphql/query.cleaning'
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  components: {
    NotificationCard,
    RouteHolder,
    BellRing,
    Bell,
  },
  setup() {
    const { socketServer, connected, newNotification } = useSocket()
    const connectedToServer = ref<boolean>(connected.value)
    const notifications = ref<boolean>(
      sessionStorage.getItem('notifications') === 'true' ? true : false,
    )
    const showPopup = ref<boolean>(
      sessionStorage.getItem('showPopup') === 'true' ? true : false,
    )
    const newReservation = ref<any>(
      sessionStorage.getItem('newReservation')
        ? //@ts-ignore
          JSON.parse(sessionStorage.getItem('newReservation'))
        : null,
    )
    const newRequestedService = ref<any>(
      sessionStorage.getItem('newRequestedService')
        ? //@ts-ignore
          JSON.parse(sessionStorage.getItem('newRequestedService'))
        : null,
    )
    const togglePopup = () => {
      showPopup.value = !showPopup.value
      notifications.value = false
      notificationFalse()
      sessionStorage.setItem('showPopup', showPopup.value.toString())
    }

    const notificationFalse = () => {
      sessionStorage.setItem('notifications', 'false')
    }

    const { refetch: refetchRWR } = useQuery(GET_ROOMS_WITHOUT_RESERVATION)
    const { refetch: refetchURS } = useQuery(GET_UNRESOLVED_SERVICES)
    const { refetch: refetchRWB } = useQuery(GET_RESERVATIONS_WITH_BREAKFAST)
    const { refetch: refetchR } = useQuery(GET_RESERVATIONS)
    const { refetch: refetchC } = useQuery(GET_CLEANINGS)

    const refetchHomeData = () => {
      refetchRWR()
      refetchURS()
      refetchRWB()
      refetchR()
      refetchC()
    }

    if (connected.value === true) {
      socketServer.value!.on(
        'reservation:newReservation',
        (reservation: Reservation) => {
          notifications.value = true
          sessionStorage.setItem('notifications', 'true')
          newReservation.value = reservation
          newRequestedService.value = null
          sessionStorage.setItem('newReservation', JSON.stringify(reservation))
          newNotification.value = false
          refetchHomeData()
        },
      )

      socketServer.value!.on(
        'requestedService:newRequestedService',
        (requestedService) => {
          notifications.value = true
          sessionStorage.setItem('notifications', 'true')
          newRequestedService.value = requestedService
          newReservation.value = null
          sessionStorage.setItem(
            'newRequestedService',
            JSON.stringify(requestedService),
          )
          newNotification.value = false
          refetchHomeData()
        },
      )
    }

    return {
      notifications,
      showPopup,
      newReservation,
      newRequestedService,
      togglePopup,
      notificationFalse,
    }
  },
}
</script>
