<template>
  <main class="bg-themeWhite flex h-full">
    <section class="flex h-full w-full">
      <admin-navigation />
      <div class="w-5/6 p-6">
        <admin-header :name="`Room ${params.id}`" />
        <div class="p-6 lg:flex lg:justify-evenly lg:gap-6">
          <div>
            <div>
              <label
                for="roomAvailable"
                class="flex cursor-pointer items-center"
              >
                <div class="relative">
                  <input
                    id="roomAvailable"
                    type="checkbox"
                    class="peer sr-only"
                  />
                  <div
                    class="peer-checked:bg-themeBrown h-4 w-10 rounded-full bg-gray-400 shadow-inner"
                  ></div>
                  <div
                    class="absolute -left-1 -top-1 h-6 w-6 rounded-full bg-white shadow transition peer-checked:translate-x-full"
                  ></div>
                </div>
                <div class="ml-3">Available</div>
              </label>
            </div>
            <img
              class="lg:w-94 mb-6 mt-6 aspect-video rounded-md object-cover shadow-md"
              :src="luxe"
              :alt="`picture of a -suite`"
            />
            <p class="leading-8 lg:max-w-sm">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores.
            </p>
            <p class="py-6">Price per night: <span>120$</span></p>
          </div>
          <div class="lg:w-1/2">
            <h1 class="font-title pb-6 text-xl font-bold lg:text-2xl">
              Reservation history
            </h1>
            <reservation-history-table :observations="[1, 2, 3]" />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import RouteHolder from '../../../components/holders/RouteHolder.vue'
import AdminNavigation from '../../../components/generic/AdminNavigation.vue'
import AdminHeader from '../../../components/generic/AdminHeader.vue'
import ReservationHistoryTable from '../../../components/rooms/ReservationHistoryTable.vue'
import { Search, Plus, Frown } from 'lucide-vue-next'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import { Room } from '../../../interfaces/interface.room'
import { ROOM_BY_ID } from '../../../graphql/query.room'
import luxe from '../../../assets/luxe-suite.webp'
export default {
  components: {
    RouteHolder,
    AdminNavigation,
    AdminHeader,
    ReservationHistoryTable,
    Search,
    Plus,
    Frown,
  },
  setup() {
    const { params } = useRoute()
    const { result, loading, error } = useQuery<{ room: Room }>(ROOM_BY_ID, {
      id: params.id,
    })

    return {
      result,
      loading,
      error,
      params,
      luxe,
    }
  },
}
</script>
