<template>
  <main class="bg-themeWhite flex h-full">
    <section class="flex h-full w-full">
      <admin-navigation />
      <div class="w-5/6 p-6">
        <admin-header name="Rooms" />
        <div className="p-6 md:grid md:grid-cols-3 md:items-start">
          <label for="rooms" class="relative block">
            <Search
              class="pointer-events-none absolute top-1/2 ml-2 -translate-y-1/2 transform text-neutral-400"
            />
            <input
              type="text"
              name="rooms"
              v-model="searchRoomName"
              id="rooms"
              className="w-full border rounded-md border-themeBrown pl-10  py-2 block focus:outline-none focus:ring focus:ring-themeBrown"
              placeholder="Search"
            />
          </label>
          <div class="py-2 md:ml-3 md:flex md:items-center md:py-0">
            <label for="category" class="flex items-center">
              <select
                v-model="searchRoomCat"
                id="category"
                class="border-themeBrown focus:ring-themeBrown block w-full rounded-md border py-2 px-4 text-neutral-600 focus:outline-none focus:ring"
              >
                <option value="" selected disabled>Pick category</option>
                <option value="Luxe">Luxe</option>
                <option value="Standard">Standard</option>
                <option value="">All</option>
              </select>
            </label>
          </div>
          <div>
            <router-link
              to="/admin/rooms/add"
              class="border-themeBrown bg-themeOffWhite text-themeBrown focus:ring-themeBrown hover:bg-themeBrown flex items-center justify-center rounded-md border px-6 py-2 text-sm hover:bg-opacity-20 focus:outline-none focus:ring md:place-self-end lg:w-2/3"
            >
              <Plus class="mr-2" size="20" />
              ADD ROOM
            </router-link>
          </div>
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
              v-for="r of result.roomsByNameCat"
              :key="r.id"
            >
              <div class="rounded-md bg-white p-3 shadow-md">
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
import { ref, watch, watchEffect } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { GET_ROOMS, ROOM_BY_NAME_CAT } from '../../../graphql/query.room'
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
    const searchRoomName = ref<string>('')
    const searchRoomCat = ref<string>('')
    const { result, loading, error, refetch } = useQuery(ROOM_BY_NAME_CAT, {
      searchRoomByName: searchRoomName,
      searchRoomByCat: searchRoomCat,
    })
    const skeletons = ref<number>(6)

    // watch(?, () => {
    //   refetch()
    // })

    return {
      result,
      loading,
      error,
      skeletons,
      luxe,
      standard,
      searchRoomName,
      searchRoomCat,
    }
  },
}
</script>
