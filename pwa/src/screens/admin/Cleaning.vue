<template>
  <main class="bg-themeWhite flex h-full">
    <section class="flex h-full w-full">
      <admin-navigation />
      <div class="w-5/6 p-6">
        <admin-header name="Cleaning" />
        <div class="p-6 md:flex">
          <label for="rooms" class="relative block w-11/12 md:w-2/3 lg:w-1/3">
            <Search
              class="pointer-events-none absolute top-1/2 ml-2 -translate-y-1/2 transform text-neutral-400"
            />
            <input
              type="text"
              name="rooms"
              id="rooms"
              className="w-full border rounded-md border-themeBrown pl-10 py-2 block focus:outline-none focus:ring focus:ring-themeBrown"
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
              <div class="ml-3">Show cleaned</div>
            </label>
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
            <div v-for="r of result.rooms" :key="r.id">
              <button
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
          </div>
          <div v-if="showPopup">
            <cleaning-pop-up :togglePopup="() => togglePopup()" :id="roomId" />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import RouteHolder from '../../components/holders/RouteHolder.vue'
import AdminNavigation from '../../components/generic/AdminNavigation.vue'
import AdminHeader from '../../components/generic/AdminHeader.vue'
import CleaningPopUp from '../../components/rooms/CleaningPopUp.vue'
import { Search, Plus, Frown } from 'lucide-vue-next'
import { ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import luxe from '../../assets/luxe-suite.webp'
import standard from '../../assets/standard-suite.webp'
import { GET_ROOMS } from '../../graphql/query.room'

export default {
  components: {
    RouteHolder,
    AdminNavigation,
    AdminHeader,
    CleaningPopUp,
    Search,
    Plus,
    Frown,
  },
  setup() {
    const { result, loading, error } = useQuery(GET_ROOMS)
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
