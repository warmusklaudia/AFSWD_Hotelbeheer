<template>
  <div class="bg-themeWhite flex h-full">
    <section class="flex h-full w-full">
      <admin-navigation />
      <div class="w-5/6 p-6">
        <admin-header name="Manage users" />
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
            class="grid gap-12 sm:grid-cols-1 md:mx-6 md:grid-cols-2 lg:grid-cols-3"
            v-else-if="result"
          >
            <router-link
              :to="`/admin/users/${u.uid}`"
              v-for="u of result.users"
              :key="u.id"
            >
              <div
                class="flex rounded-md bg-white p-3 shadow-md hover:opacity-80 md:flex-col"
              >
                <div
                  v-if="u?.imgUrl === ''"
                  class="bg-themeGreen md:w-18 md:h-18 mr-4 flex h-12 w-12 items-center justify-center place-self-center rounded-full md:mr-0 md:mb-3"
                >
                  <p
                    class="font-title text-sm text-white md:text-xl md:font-bold"
                  >
                    {{ u.firstName[0] }}{{ u.lastName[0] }}
                  </p>
                </div>
                <img
                  v-else
                  class="md:w-18 md:h-18 mr-4 flex h-12 w-12 place-self-center rounded-full object-cover md:mr-0 md:mb-3"
                  :src="u?.imgUrl"
                  :alt="`Picture of ${u.firstName} ${u.lastName}`"
                />
                <div class="text-themeGreen pb-3">
                  <p
                    class="font-title text-xl font-bold md:pb-3 md:text-center"
                  >
                    {{ u.firstName }} {{ u.lastName }}
                  </p>
                  <p class="text-center text-lg">{{ u.role.name }}</p>
                </div>
              </div>
              <div></div>
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import RouteHolder from '../../../components/holders/RouteHolder.vue'
import AdminNavigation from '../../../components/generic/AdminNavigation.vue'
import AdminHeader from '../../../components/generic/AdminHeader.vue'
import { Search, Plus, Frown } from 'lucide-vue-next'
import { ref, watch } from 'vue'
import { GET_USERS } from '../../../graphql/query.user'
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
    const { result, loading, error } = useQuery(GET_USERS)
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
