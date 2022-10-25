<template>
  <main class="bg-themeWhite flex h-full">
    <section class="flex h-full w-full">
      <admin-navigation />
      <div class="w-5/6 p-6">
        <admin-header name="Rooms" />
        <div className="p-6 md:flex md:justify-between">
          <label for="rooms" class="relative block w-11/12 md:w-2/3 lg:w-1/3">
            <Search
              class="pointer-events-none absolute top-1/2 ml-2 -translate-y-1/2 transform text-neutral-400"
            />
            <input
              type="text"
              name="rooms"
              id="rooms"
              className="w-full border rounded-md border-themeBrown pl-10  py-2 block focus:outline-none focus:ring focus:ring-themeBrown"
              placeholder="Search"
            />
          </label>
          <div class="pt-2 md:ml-3 md:flex md:items-center md:pt-0 lg:w-2/5">
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
          <button
            class="border-themeBrown bg-themeOffWhite text-themeBrown focus:ring-themeBrown hover:bg-themeBrown flex items-center rounded-md border px-6 py-2 text-sm hover:bg-opacity-20 focus:outline-none focus:ring"
          >
            <Plus class="mr-2" size="20" />
            ADD ROOM
          </button>
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
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import RouteHolder from '../../components/holders/RouteHolder.vue'
import AdminNavigation from '../../components/generic/AdminNavigation.vue'
import AdminHeader from '../../components/generic/AdminHeader.vue'
import { Search, Plus, Frown } from 'lucide-vue-next'
import { ref } from 'vue'
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'

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
    const { result, loading, error } = useQuery(gql`
      query rooms {
        rooms {
          id
        }
      }
    `)
    const skeletons = ref<number>(6)
    return {
      result,
      loading,
      error,
      skeletons,
    }
  },
}
</script>
