<template>
  <div
    class="bg-themeGreen h-auto w-96 transform rounded-lg py-3 text-lg shadow-lg"
  >
    <div class="flex h-full flex-col justify-between">
      <div class="text-themeGreen mx-6 text-center">
        <button
          @click="togglePopup()"
          class="border-themeGreen float-right flex h-8 w-8 items-center justify-center self-end rounded-full border border-white text-white"
        >
          <X />
        </button>

        <h2
          v-if="props?.reservation"
          class="font-title text-center text-lg text-white"
        >
          New reservation created
        </h2>
        <h2 v-else class="font-title text-center text-lg text-neutral-100">
          No notifications
        </h2>
      </div>
      <div
        class="mx-4 flex justify-center gap-4 text-sm text-white"
        v-if="props?.reservation"
      >
        <p>Adults: {{ props.reservation.amountAdults }}</p>
        <p>Children: {{ props.reservation.amountChildren }}</p>
      </div>
      <div
        v-if="props?.reservation"
        class="mx-4 flex justify-center pb-2 text-sm text-white"
      >
        <p>
          Period:
          {{
            new Date(
              props.reservation.reservationStartDate,
            ).toLocaleDateString()
          }}
          -
          {{
            new Date(props.reservation.reservationEndDate).toLocaleDateString()
          }}
        </p>
      </div>
      <div class="pt-2" v-if="props?.reservation">
        <button
          class="border-themeBrown bg-themeOffWhite text-themeBrown focus:ring-themeBrown m-auto mb-6 flex items-center rounded-md border px-6 py-2 text-sm hover:bg-opacity-80 focus:outline-none focus:ring"
        >
          SHOW RESERVATIONS
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useMutation, useQuery } from '@vue/apollo-composable'
import { reactive, watch } from 'vue'
import { Check, X, Frown } from 'lucide-vue-next'
import { ROOM_BY_ID } from '../../graphql/query.room'
import { UPDATE_CLEANING } from '../../graphql/mutation.cleaning'
import { GET_USER_BY_UID } from '../../graphql/query.user'
import Room from '../../interfaces/interface.room'
import useAuthentication from '../../composables/useAuthentication'
import ReservationHistoryTable from '../rooms/ReservationHistoryTable.vue'
import { Reservation } from '../../interfaces/interface.reservation'

export default {
  props: {
    togglePopup: {
      type: Function,
      required: true,
    },
    reservation: {
      type: Object as () => Reservation | null,
      required: false,
    },
  },
  setup(props) {
    console.log(props.reservation)
    return {
      props,
    }
  },
  components: { Check, X, Frown },
}
</script>
