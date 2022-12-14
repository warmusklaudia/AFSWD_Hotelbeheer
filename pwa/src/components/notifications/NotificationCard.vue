<template>
  <div
    class="bg-themeGreen h-auto w-56 transform rounded-lg py-3 text-lg shadow-lg md:w-96"
  >
    <div class="flex h-full flex-col justify-between">
      <div class="text-themeGreen mx-6 text-center">
        <button
          @click="togglePopup()"
          class="border-themeGreen float-right flex h-8 w-8 items-center justify-center self-end rounded-full border border-white text-white hover:opacity-80"
        >
          <X />
        </button>

        <h2
          v-if="props?.reservation"
          class="font-title text-center text-lg text-white"
        >
          New reservation created
        </h2>
        <h2
          v-else-if="props?.requestedService"
          class="font-title text-center text-lg text-white"
        >
          New service request
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
        class="mx-4 flex justify-center gap-4 text-sm text-white"
        v-else-if="props?.requestedService"
      >
        <p>Service: {{ serviceName }}</p>
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
      <div
        class="mx-4 flex justify-center pb-2 text-sm text-white"
        v-else-if="props?.requestedService"
      >
        <p>Requested by: {{ firstName }} {{ lastName }}</p>
      </div>
      <div
        class="mx-4 flex justify-center pb-2 text-sm text-white"
        v-if="props?.requestedService"
      >
        <p>
          Date:
          {{
            new Date(props.requestedService.requestedDate).toLocaleDateString()
          }}
        </p>
      </div>
      <div class="pt-2" v-if="props?.reservation">
        <router-link
          to="/admin/reservations"
          class="border-themeBrown bg-themeOffWhite text-themeBrown focus:ring-themeBrown m-auto mb-6 hidden w-64 items-center justify-center rounded-md border px-6 py-2 text-sm hover:bg-opacity-80 focus:outline-none focus:ring md:flex"
        >
          SHOW RESERVATIONS
        </router-link>
      </div>
      <div class="pt-2" v-if="props?.requestedService">
        <router-link
          to="/admin/services"
          class="border-themeBrown bg-themeOffWhite text-themeBrown focus:ring-themeBrown m-auto mb-6 hidden w-64 items-center justify-center rounded-md border px-6 py-2 text-sm hover:bg-opacity-80 focus:outline-none focus:ring md:flex"
        >
          SHOW REQUESTED SERVICES
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { Check, X, Frown } from 'lucide-vue-next'
import { RequestedService } from '../../interfaces/interface.requestedService'
import { Reservation } from '../../interfaces/interface.reservation'
import { GET_SERVICE } from '../../graphql/query.service'
import { watch, ref } from 'vue'
import { GET_USER_BY_UID } from '../../graphql/query.user'

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
    requestedService: {
      type: Object as () => RequestedService | null,
      required: false,
    },
  },
  setup(props) {
    const serviceName = ref<string>('')
    const firstName = ref<string>('')
    const lastName = ref<string>('')
    if (props.requestedService) {
      const { result, loading, error } = useQuery(GET_SERVICE, {
        id: props.requestedService.serviceId,
      })
      const {
        result: resUser,
        loading: loadUser,
        error: ErrUser,
      } = useQuery(GET_USER_BY_UID, { uid: props.requestedService.userId })
      watch(result, () => {
        console.log(result)
        serviceName.value = result.value.service.name
      })
      watch(resUser, () => {
        console.log(resUser)
        firstName.value = resUser.value.findByUid.firstName
        lastName.value = resUser.value.findByUid.lastName
      })
    }
    console.log(props.reservation)
    console.log(props.requestedService)
    return {
      props,
      serviceName,
      firstName,
      lastName,
    }
  },
  components: { Check, X, Frown },
}
</script>
