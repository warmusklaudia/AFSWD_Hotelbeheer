<template>
  <div class="bg-themeWhite flex h-full">
    <section class="flex h-full w-full">
      <admin-navigation />
      <div class="w-5/6 p-6">
        <admin-header name="Cleaning" />
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
            class="grid max-h-[60vh] gap-12 overflow-y-auto sm:grid-cols-1 md:mx-6 md:max-h-[65vh] md:grid-cols-2 lg:max-h-[70vh] lg:grid-cols-3"
            v-else-if="result"
          >
            <div
              v-if="result.roomsWithReservation.length > 0"
              v-for="r of result.roomsWithReservation"
              :key="r.id"
            >
              <button
                :class="
                  r.reservation.cleaning.finish === true ? 'opacity-75' : ''
                "
                class="rounded-md bg-white p-3 shadow-md"
                @click=";[togglePopup(), checkId(r.id)]"
              >
                <img
                  v-if="r.category == 'Luxe'"
                  class="mb-6 aspect-video w-full object-cover"
                  :src="luxe"
                  :alt="`picture of a ${r.category}-suite`"
                />
                <img
                  v-if="r.category == 'Standard'"
                  class="mb-6 aspect-video w-full object-cover"
                  :src="standard"
                  :alt="`picture of a ${r.category}-suite`"
                />
                <div class="flex justify-between">
                  <p>{{ r.name }}</p>
                  <p class="first-letter:uppercase">{{ r.category }}</p>
                </div>
                <div class="bg-themeGreen h-1 w-full"></div>
              </button>
            </div>
            <div
              class="flex flex-col items-center justify-center opacity-80"
              v-else
            >
              <NoData class="h-48 w-48 md:h-56 md:w-56" />
              <p class="md:text-md pt-4 text-center text-sm">
                There are no rooms to clean.
              </p>
            </div>
          </div>
          <div v-if="showPopup">
            <cleaning-pop-up :togglePopup="() => togglePopup()" :id="roomId" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import RouteHolder from '../../components/holders/RouteHolder.vue'
import AdminNavigation from '../../components/generic/AdminNavigation.vue'
import AdminHeader from '../../components/generic/AdminHeader.vue'
import CleaningPopUp from '../../components/rooms/CleaningPopUp.vue'
import { Search, Plus, Frown, Check } from 'lucide-vue-next'
import { ref, watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import luxe from '../../assets/luxe-suite.webp'
import standard from '../../assets/standard-suite.webp'
import { GET_ROOMS_WITH_RESERVATION } from '../../graphql/query.room'
import NoData from '../../assets/svg/NoData.vue'

export default {
  components: {
    RouteHolder,
    AdminNavigation,
    AdminHeader,
    CleaningPopUp,
    Search,
    Plus,
    Frown,
    Check,
    NoData,
  },
  setup() {
    const { result, loading, error } = useQuery(GET_ROOMS_WITH_RESERVATION)
    let showPopup = ref<boolean>(false)
    let roomId = ref<string>('')

    const togglePopup = () => {
      showPopup.value = !showPopup.value
    }

    const checkId = (id: string) => {
      roomId.value = id
    }

    const skeletons = ref<number>(6)
    return {
      togglePopup,
      checkId,
      result,
      loading,
      error,
      skeletons,
      luxe,
      standard,
      showPopup,
      roomId,
    }
  },
}
</script>
