<template>
  <div>
    <div
      class="fixed top-0 left-0 z-20 h-full w-full bg-neutral-900 bg-opacity-25"
      @click="togglePopup()"
    ></div>
    <div
      class="fixed top-1/2 left-1/2 z-30 h-96 w-2/3 -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white pt-6 text-lg shadow-lg md:h-96 md:w-2/5"
    >
      <div class="animate-pulse p-6" v-if="loading">
        <div
          class="mb-4 aspect-square h-10 w-full rounded-md bg-neutral-300"
        ></div>
        <div
          class="mb-4 aspect-square h-10 w-full rounded-md bg-neutral-300"
        ></div>
        <div
          class="mb-4 aspect-square h-10 w-full rounded-md bg-neutral-300"
        ></div>
      </div>
      <div class="flex items-center justify-center" v-else-if="error">
        <p class="ml-6 text-xl md:mr-2">Error happened</p>
        <Frown />
      </div>
      <div class="flex h-full flex-col justify-between" v-else-if="result">
        <div class="text-themeGreen mx-6 text-center">
          <button
            @click="togglePopup()"
            class="border-themeGreen float-right flex h-8 w-8 items-center justify-center self-end rounded-full border hover:opacity-80"
          >
            <X />
          </button>

          <h2 class="font-title self-center font-bold md:text-xl">
            <span
              >{{ result?.reservation.user.firstName }}
              {{ result?.reservation.user.lastName }}</span
            >'s reservation
          </h2>
        </div>
        <div class="items-center justify-evenly lg:flex">
          <div class="px-6 py-4">
            <div class="mb-1 flex items-center gap-3 md:mb-3">
              <Calendar />
              <p class="truncate text-sm tracking-wide md:text-base">
                {{
                  new Date(
                    result?.reservation.reservationStartDate,
                  ).toLocaleDateString()
                }}
                -
                {{
                  new Date(
                    result?.reservation.reservationEndDate,
                  ).toLocaleDateString()
                }}
              </p>
            </div>
            <div
              v-for="x in result?.reservation.rooms"
              class="mb-1 flex items-center gap-3 md:mb-3"
            >
              <Bed />
              <p class="text-sm tracking-wide md:text-base">
                {{ x.name }}
              </p>
            </div>
            <div class="mb-1 flex items-center gap-3 md:mb-3">
              <Users />
              <p class="text-sm tracking-wide md:text-base">
                {{ result?.reservation.amountAdults }} adults
              </p>
            </div>
            <div class="mb-1 flex items-center gap-3 md:mb-3">
              <Users />
              <p class="text-sm tracking-wide md:text-base">
                {{ result?.reservation.amountChildren }} children
              </p>
            </div>
            <div class="mb-1 flex items-center gap-3 md:mb-3">
              <Banknote />
              <p class="text-sm tracking-wide md:text-base">
                € {{ result?.reservation.price }}
              </p>
            </div>
            <div class="mb-1 flex items-center gap-3 md:mb-3">
              <Utensils />
              <p class="truncate text-sm tracking-wide md:text-base">
                {{
                  result?.reservation.breakfastAccess
                    ? 'Breakfast included'
                    : 'No breakfast included'
                }}
              </p>
            </div>
          </div>
          <travel class="mr-3 hidden lg:flex lg:h-36 lg:w-56" />
        </div>

        <button
          @click="togglePopup()"
          class="border-themeBrown bg-themeOffWhite text-themeBrown focus:ring-themeBrown hover:bg-themeBrown m-auto mb-6 flex items-center rounded-md border px-6 py-2 text-sm hover:bg-opacity-20 focus:outline-none focus:ring"
        >
          OK
        </button>
      </div>
    </div>
  </div>
  <div
    class="bg-themeBrown fixed top-1/2 left-1/2 z-20 m-2 h-96 w-2/3 -translate-x-1/2 -translate-y-1/2 transform rounded-lg pt-6 text-lg shadow-lg md:h-96 md:w-2/5"
  ></div>
</template>

<script lang="ts">
import Travel from '../../assets/svg/Travel.vue'
import { useQuery } from '@vue/apollo-composable'
import { watch } from 'vue'
import {
  Check,
  X,
  Frown,
  Calendar,
  Bed,
  Users,
  Banknote,
  Utensils,
} from 'lucide-vue-next'
import { RESERVATION_BY_ID } from '../../graphql/query.reservation'

export default {
  components: {
    Travel,
    Check,
    X,
    Frown,
    Calendar,
    Bed,
    Users,
    Banknote,
    Utensils,
  },
  props: {
    togglePopup: {
      type: Function,
      required: true,
    },
    id: {
      type: String as () => string,
      required: true,
    },
  },
  setup(props) {
    const { result, loading, error } = useQuery(RESERVATION_BY_ID, {
      id: props.id,
    })
    watch(result, () => {
      console.log(result.value.reservation)
    })
    return { result, loading, error }
  },
}
</script>
