<template>
  <div class="bg-themeWhite flex h-full">
    <section class="flex h-full w-full">
      <admin-navigation />
      <div class="w-5/6 p-6">
        <admin-header name="Breakfast access" />
        <div class="p-6">
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
            <RouterLink to="" v-for="a of result.access" :key="a.id">
              <div class="rounded-md bg-white p-3 shadow-md">
                <img
                  class="mb-2 aspect-video w-full object-cover"
                  src="../../assets/user.jpg"
                  :alt="`picture of a user`"
                />
                <div class="font-title text-themeGreen pb-3">
                  <p class="pb-3 text-center text-xl">Klaudia Warmus</p>
                  <p class="text-lg">Access from</p>
                  <p class="font-bold">
                    <span>21 Oct 2022</span> by <span>21 Oct 2022</span>
                  </p>
                </div>
              </div>
              <div></div>
            </RouterLink>
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
import { Search, Frown } from 'lucide-vue-next'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { ref } from 'vue'
import { GET_ROOMS } from '../../graphql/query.room'

export default {
  components: {
    RouteHolder,
    AdminNavigation,
    AdminHeader,
    Search,
    Frown,
  },
  setup() {
    const { result, loading, error } = useQuery(gql`
      query x {
        x {
          id
          name
          description
          rating
          category
        }
      }
    `)
    const skeletons = ref<number>(6)
    return { result, loading, error, skeletons }
  },
}
</script>
