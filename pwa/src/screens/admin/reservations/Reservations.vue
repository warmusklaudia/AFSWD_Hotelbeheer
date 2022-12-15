<template>
  <div class="bg-themeWhite flex h-full">
    <section class="flex h-full w-full">
      <admin-navigation />
      <div class="w-5/6 p-6">
        <admin-header name="Reservations" />
        <div>
          <div
            class="grid animate-pulse gap-12 sm:grid-cols-1 md:mx-6 md:grid-cols-2 lg:grid-cols-3"
            v-if="loading"
          >
            <div v-for="i of skeletons" :key="i">
              <div class="aspect-square rounded-md bg-neutral-300"></div>
              <p class="my-1 h-6 w-full rounded bg-neutral-200"></p>
            </div>
          </div>
          <div class="flex items-center" v-else-if="error">
            <p class="ml-6 text-xl md:mr-2">Error happened</p>
            <Frown />
          </div>
          <div
            class="grid max-h-[75vh] gap-12 overflow-y-auto p-2 sm:grid-cols-1 md:mx-6 md:max-h-[65vh] md:grid-cols-2 lg:max-h-[70vh] lg:grid-cols-3"
            v-else-if="result"
          >
            <button
              class="rounded-md bg-white py-3 px-4 shadow-md hover:opacity-80"
              v-if="result.reservations.length > 0"
              v-for="r of result.reservations"
              :key="r.id"
              @click=";[togglePopup(), checkId(r.id)]"
            >
              <div class="my-3 flex items-center gap-3">
                <Contact />
                <p class="text-sm tracking-wide">
                  {{ r.user.firstName }} {{ r.user.lastName }}
                </p>
              </div>
              <div class="mb-3 flex items-center gap-3">
                <Calendar />
                <p class="text-sm tracking-wide">
                  {{ new Date(r.reservationStartDate).toLocaleDateString() }}
                  - {{ new Date(r.reservationEndDate).toLocaleDateString() }}
                </p>
              </div>
              <div v-for="x in r.rooms" class="my-3 flex items-center gap-3">
                <Bed />
                <p class="text-sm tracking-wide">
                  {{ x.name }}
                </p>
              </div>
            </button>
            <div
              class="flex flex-col items-center justify-center opacity-80"
              v-else
            >
              <NoData class="h-48 w-48 md:h-56 md:w-56" />
              <p class="md:text-md pt-4 text-center text-sm">
                There are no reservations.
              </p>
            </div>
          </div>
        </div>
        <div v-if="showPopup">
          <reservation-popup
            :togglePopup="() => togglePopup()"
            :id="reservationId"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { watch, ref } from 'vue'
import { GET_RESERVATIONS } from '../../../graphql/query.reservation'
import { Calendar, Contact, Bed, Frown } from 'lucide-vue-next'
import AdminHeader from '../../../components/generic/AdminHeader.vue'
import AdminNavigation from '../../../components/generic/AdminNavigation.vue'
import ReservationPopup from '../../../components/reservations/ReservationPopup.vue'
import NoData from '../../../assets/svg/NoData.vue'
export default {
  components: {
    AdminHeader,
    AdminNavigation,
    ReservationPopup,
    NoData,
    Calendar,
    Contact,
    Bed,
    Frown,
  },
  setup() {
    const skeletons = ref<number>(6)
    const { result, loading, error } = useQuery(GET_RESERVATIONS)
    let showPopup = ref<boolean>(false)
    let reservationId = ref<string>('')

    const togglePopup = () => {
      showPopup.value = !showPopup.value
    }

    const checkId = (id: string) => {
      reservationId.value = id
    }
    return {
      result,
      loading,
      error,
      skeletons,
      showPopup,
      reservationId,
      togglePopup,
      checkId,
    }
  },
}
</script>
