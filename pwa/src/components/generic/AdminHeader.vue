<template>
  <header class="flex flex-col">
    <div class="relative flex w-full justify-between">
      <route-holder :title="name" />
      <div
        @click=";[(notifications = false), togglePopup()]"
        class="bg-themeGreen col-end-3 flex h-12 w-12 cursor-pointer items-center justify-center justify-self-end rounded-full text-white shadow-md md:col-end-7 md:h-14 md:w-14 lg:col-end-8 lg:h-16 lg:w-16"
      >
        <bell-ring />
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
        :togglePopup="() => togglePopup()"
      />
    </div>
  </header>
</template>

<script lang="ts">
import { BellRing } from 'lucide-vue-next'
import { ref } from 'vue'
import RouteHolder from '../../components/holders/RouteHolder.vue'
import useSocket from '../../composables/useSocket'
import NotificationCard from '../../components/notifications/NotificationCard.vue'
import { Reservation } from '../../interfaces/interface.reservation'
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
  },
  setup() {
    const { socketServer } = useSocket()
    const notifications = ref<boolean>(false)
    const showPopup = ref<boolean>(false)
    const newReservation = ref<Reservation | null>(null)

    const togglePopup = () => {
      showPopup.value = !showPopup.value
    }

    socketServer.value!.on(
      'reservation:newReservation',
      (reservation: Reservation) => {
        notifications.value = true
        console.log(reservation)
        newReservation.value = reservation
        console.log(newReservation)
      },
    )
    return {
      notifications,
      showPopup,
      newReservation,
      togglePopup,
    }
  },
}
</script>
