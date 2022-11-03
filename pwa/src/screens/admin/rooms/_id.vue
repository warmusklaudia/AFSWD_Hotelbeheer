<template>
  <main class="bg-themeWhite flex h-full">
    <section class="flex h-full w-full">
      <admin-navigation />
      <div class="w-5/6 p-6">
        <admin-header :name="`Room ${result?.room.name}`" />
        <h2 class="font-title pl-6 font-bold">{{ result?.room.id }}</h2>
        <div class="p-6 lg:flex lg:justify-evenly lg:gap-6">
          <div v-if="loading">
            <p>Loading</p>
          </div>
          <div v-else-if="error">
            <p>Error happened.</p>
          </div>
          <div v-else-if="result">
            <img
              class="lg:w-94 mb-6 mt-6 aspect-video rounded-md object-cover shadow-md"
              :src="luxe"
              :alt="`picture of a -suite`"
            />
            <p class="leading-8 lg:max-w-sm">
              {{ result.room.description }}
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
