<template>
  <div class="bg-themeWhite h-full">
    <section class="flex h-full w-full">
      <admin-navigation />
      <div
        class="grid w-5/6 grid-cols-2 gap-4 p-6 md:grid-cols-6 lg:grid-cols-7"
      >
        <admin-header class="col-start-1 col-end-8" name="Home" />
        <div
          class="col-start-1 col-end-3 row-start-2 row-end-3 ml-10 justify-self-center md:col-start-2 md:ml-0"
        >
          <div
            class="2xl:h-68 absolute z-10 h-56 w-48 rounded-md bg-white shadow-lg lg:h-60 lg:w-56 2xl:w-64"
          >
            <div class="flex h-full flex-col justify-center">
              <p
                class="font-title text-themeGreen decoration-themeBrown pb-3 text-center text-7xl underline decoration-4 lg:text-8xl"
              >
                {{ roomsAvailable }}
              </p>
              <p class="text-themeGreen text-center lg:p-3">Rooms available</p>
            </div>
          </div>
          <div
            class="bg-themeBrown 2xl:h-68 z-0 m-2 h-56 w-48 rounded-md lg:h-60 lg:w-56 2xl:w-64"
          ></div>
        </div>
        <div
          class="col-start-1 col-end-3 row-start-3 row-end-4 ml-10 justify-self-center md:col-start-6 md:row-start-2 md:ml-0 lg:col-start-4 lg:col-end-5"
        >
          <div
            class="2xl:h-68 absolute z-10 h-56 w-48 rounded-md bg-white shadow-lg lg:h-60 lg:w-56 2xl:w-64"
          >
            <div class="flex h-full flex-col justify-center">
              <p
                class="font-title text-themeGreen decoration-themeBrown pb-3 text-center text-7xl underline decoration-4 lg:text-8xl"
              >
                {{ requestedServices }}
              </p>
              <p class="text-themeGreen text-center lg:p-3">
                Requested services
              </p>
            </div>
          </div>
          <div
            class="bg-themeBrown 2xl:h-68 z-0 m-2 h-56 w-48 rounded-md lg:h-60 lg:w-56 2xl:w-64"
          ></div>
        </div>
        <div
          class="col-start-1 col-end-3 row-start-4 row-end-5 ml-10 justify-self-center md:col-start-2 md:ml-0 lg:col-start-6 lg:col-end-7 lg:row-start-2"
        >
          <div
            class="2xl:h-68 absolute z-10 h-56 w-48 rounded-md bg-white shadow-lg lg:h-60 lg:w-56 2xl:w-64"
          >
            <div class="flex h-full flex-col justify-center">
              <p
                class="font-title text-themeGreen decoration-themeBrown pb-3 text-center text-7xl underline decoration-4 lg:text-8xl"
              >
                {{ cleanings }}
              </p>
              <p class="text-themeGreen text-center lg:p-3">Rooms to clean</p>
            </div>
          </div>
          <div
            class="bg-themeBrown 2xl:h-68 z-0 m-2 h-56 w-48 rounded-md lg:h-60 lg:w-56 2xl:w-64"
          ></div>
        </div>
        <div
          class="lg-col-end-4 col-start-1 col-end-3 row-start-5 row-end-6 ml-10 justify-self-center md:col-start-2 md:col-end-7 md:row-start-4 md:row-end-5 md:ml-0 lg:col-start-3"
        >
          <div
            class="2xl:h-68 absolute z-10 h-56 w-48 rounded-md bg-white shadow-lg lg:h-60 lg:w-56 2xl:w-64"
          >
            <div class="flex h-full flex-col justify-center">
              <p
                class="font-title text-themeGreen decoration-themeBrown pb-3 text-center text-7xl underline decoration-4 lg:text-8xl"
              >
                {{ reservations }}
              </p>
              <p class="text-themeGreen text-center lg:p-3">Reservations</p>
            </div>
          </div>
          <div
            class="bg-themeBrown 2xl:h-68 z-0 m-2 h-56 w-48 rounded-md lg:h-60 lg:w-56 2xl:w-64"
          ></div>
        </div>
        <div
          class="lg-col-end-6 col-start-1 col-end-3 row-start-6 row-end-7 ml-10 justify-self-center md:col-start-2 md:col-end-5 md:ml-0 lg:col-start-5 lg:row-start-4 lg:row-end-5"
        >
          <div
            class="2xl:h-68 absolute z-10 h-56 w-48 rounded-md bg-white shadow-lg lg:h-60 lg:w-56 2xl:w-64"
          >
            <div class="flex h-full flex-col justify-center">
              <p
                class="font-title text-themeGreen decoration-themeBrown pb-3 text-center text-7xl underline decoration-4 lg:text-8xl"
              >
                {{ breakfastAccess }}
              </p>
              <p class="text-themeGreen text-center lg:p-3">
                Has access to breakfast room
              </p>
            </div>
          </div>
          <div
            class="bg-themeBrown 2xl:h-68 z-0 m-2 h-56 w-48 rounded-md lg:h-60 lg:w-56 2xl:w-64"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import RouteHolder from '../../components/holders/RouteHolder.vue'
import AdminNavigation from '../../components/generic/AdminNavigation.vue'
import AdminHeader from '../../components/generic/AdminHeader.vue'
import { BellRing } from 'lucide-vue-next'
import { GET_ROOMS_WITHOUT_RESERVATION } from '../../graphql/query.room'
import { useQuery } from '@vue/apollo-composable'
import { ref, watch } from 'vue'
import { GET_UNRESOLVED_SERVICES } from '../../graphql/query.requestedService'
import {
  GET_RESERVATIONS,
  GET_RESERVATIONS_WITH_BREAKFAST,
} from '../../graphql/query.reservation'
import { GET_CLEANINGS } from '../../graphql/query.cleaning'
import useSocket from '../../composables/useSocket'

export default {
  components: {
    RouteHolder,
    AdminNavigation,
    AdminHeader,
    BellRing,
  },
  setup() {
    const roomsAvailable = ref<number>(0)
    const requestedServices = ref<number>(0)
    const breakfastAccess = ref<number>(0)
    const reservations = ref<number>(0)
    const cleanings = ref<number>(0)
    const { result, loading, error } = useQuery(GET_ROOMS_WITHOUT_RESERVATION)
    const {
      result: resultRs,
      loading: loadingRs,
      error: errorRs,
    } = useQuery(GET_UNRESOLVED_SERVICES)
    const {
      result: breakfastResult,
      loading: breakfastLoading,
      error: breakfastError,
    } = useQuery(GET_RESERVATIONS_WITH_BREAKFAST)
    const {
      result: resultRes,
      loading: loadingRes,
      error: errorRes,
    } = useQuery(GET_RESERVATIONS)
    const {
      result: resultCleaning,
      loading: loadingCleaning,
      error: errorCleaning,
    } = useQuery(GET_CLEANINGS)

    watch(result, () => {
      roomsAvailable.value = result.value.roomsWithoutReservation.length
    })

    watch(resultRs, () => {
      requestedServices.value =
        resultRs.value.unresolvedRequestedServices.length
    })

    watch(breakfastResult, () => {
      breakfastAccess.value =
        breakfastResult.value.reservationsWithBreakfast.length
    })

    watch(resultRes, () => {
      reservations.value = resultRes.value.reservations.length
    })

    watch(resultCleaning, () => {
      cleanings.value = resultCleaning.value.notFinishedCleanings.length
    })

    return {
      result,
      loading,
      error,
      roomsAvailable,
      requestedServices,
      breakfastAccess,
      reservations,
      cleanings,
    }
  },
}
</script>
