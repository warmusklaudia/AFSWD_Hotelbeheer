<template>
  <main class="bg-themeWhite flex h-full">
    <section class="flex h-full w-full">
      <admin-navigation />
      <div class="w-5/6 p-6">
        <admin-header name="Rooms" />
        <div className="p-6 md:grid md:grid-cols-3">
          <label for="rooms" class="relative block w-11/12 md:w-full">
            <Search
              class="pointer-events-none absolute top-1/2 ml-2 -translate-y-1/2 transform text-neutral-400"
            />
            <input
              type="text"
              name="rooms"
              v-model="searchRoom"
              id="rooms"
              className="w-full border rounded-md border-themeBrown pl-10  py-2 block focus:outline-none focus:ring focus:ring-themeBrown"
              placeholder="Search"
            />
          </label>
          <div class="pt-2 md:ml-3 md:flex md:items-center md:pt-0">
            <label
              for="roomsAvailable"
              class="flex cursor-pointer items-center"
            >
              <div class="relative">
                <input
                  id="roomsAvailable"
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
              <div class="ml-3">Show unavailable</div>
            </label>
          </div>
          <router-link
            to="/admin/rooms/add"
            class="border-themeBrown bg-themeOffWhite text-themeBrown focus:ring-themeBrown hover:bg-themeBrown flex items-center justify-center rounded-md border px-6 py-2 text-sm hover:bg-opacity-20 focus:outline-none focus:ring md:w-2/3 md:place-self-end"
          >
            <Plus class="mr-2" size="20" />
            ADD ROOM
          </router-link>
        </div>
        <div>
          <div
            class="grid animate-pulse gap-12 sm:grid-cols-1 md:mx-6 md:grid-cols-2 lg:grid-cols-3"
            v-if="loading"
          >
            <div v-for="i of skeletons" :key="i">
              <div
                class="@dark:bg-neutral-700 aspect-square rounded-md bg-neutral-300"
              ></div>
              <p
                class="@dark:bg-neutral-600 my-1 h-6 w-full rounded bg-neutral-200"
              ></p>
            </div>
          </div>
          <div class="flex items-center" v-else-if="error">
            <p class="ml-6 text-xl md:mr-2">Error happened</p>
            <Frown />
          </div>
          <div
            class="grid gap-12 sm:grid-cols-1 md:mx-6 md:grid-cols-2 lg:grid-cols-3"
            v-else-if="result"
          >
            <RouterLink
              :to="`/admin/rooms/${r.id}`"
              v-for="r of result.rooms"
              :key="r.id"
            >
              <div class="rounded-md bg-white p-3 shadow-md">
                <img
                  v-if="r.category == 'luxe'"
                  class="mb-6 aspect-video w-full object-cover"
                  :src="luxe"
                  :alt="`picture of a ${r.category}-suite`"
                />
                <img
                  v-if="r.category == 'standaard'"
                  class="mb-6 aspect-video w-full object-cover"
                  :src="standard"
                  :alt="`picture of a ${r.category}-suite`"
                />
                <div class="flex justify-between">
                  <p>{{ r.name }}</p>
                  <p class="first-letter:uppercase">{{ r.category }}</p>
                </div>
                <div class="bg-themeGreen h-1 w-full"></div>
              </div>
            </RouterLink>
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
import { Search, Plus, Frown } from 'lucide-vue-next'
import { ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { GET_ROOMS } from '../../../graphql/query.room'
import { Room } from '../../../interfaces/interface.room'
import luxe from '../../../assets/luxe-suite.webp'
import standard from '../../../assets/standard-suite.webp'

export default {
  components: {
    RouteHolder,
    AdminNavigation,
    AdminHeader,
    Search,
    Plus,
    Frown,
  },
  setup() {
    const { result, loading, error } = useQuery(GET_ROOMS)
    const searchRoom = ref<string>('')
    const skeletons = ref<number>(6)

    const filteredRooms = ref<Room[]>(result.value)
    console.log(filteredRooms)

    return {
      result,
      loading,
      error,
      skeletons,
      luxe,
      standard,
      searchRoom,
      filteredRooms,
    }
  },
}
</script>