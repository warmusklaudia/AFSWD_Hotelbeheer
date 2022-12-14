<template>
  <div class="bg-themeWhite flex h-full">
    <section class="flex h-full w-full">
      <admin-navigation />
      <div class="w-5/6 p-6">
        <admin-header name="Breakfast access" />
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
            <div
              v-if="result.reservationsWithBreakfast.length > 0"
              v-for="r of result.reservationsWithBreakfast"
              :key="r.id"
            >
              <div class="flex rounded-md bg-white p-3 shadow-md md:flex-col">
                <div
                  v-if="r.user.imgUrl === ''"
                  class="bg-themeGreen md:w-18 md:h-18 mr-4 flex h-12 w-12 items-center justify-center place-self-center rounded-full md:mr-0 md:mb-3"
                >
                  <p
                    class="font-title text-sm text-white md:text-xl md:font-bold"
                  >
                    {{ r.user.firstName[0] }}{{ r.user.lastName[0] }}
                  </p>
                </div>
                <img
                  v-else
                  class="md:w-18 md:h-18 mr-4 flex h-12 w-12 items-center justify-center place-self-center rounded-full object-cover md:mr-0 md:mb-3"
                  :src="r.user.imgUrl"
                  :alt="`Picture of ${r.user.firstName}`"
                />
                <div class="font-title text-themeGreen pb-3">
                  <p class="text-xl md:pb-3 md:text-center">
                    {{ r.user.firstName }} {{ r.user.lastName }}
                  </p>
                  <p class="text-lg">Access from</p>
                  <p class="font-bold">
                    <span>{{
                      new Date(r.reservationStartDate)
                        .toUTCString()
                        .substring(
                          4,
                          new Date(r.reservationStartDate).toUTCString()
                            .length - 12,
                        )
                    }}</span>
                    to
                    <span>{{
                      new Date(r.reservationEndDate)
                        .toUTCString()
                        .substring(
                          4,
                          new Date(r.reservationStartDate).toUTCString()
                            .length - 12,
                        )
                    }}</span>
                  </p>
                </div>
              </div>
              <div></div>
            </div>
            <div
              class="flex flex-col items-center justify-center opacity-80"
              v-else
            >
              <NoData class="h-48 w-48 md:h-56 md:w-56" />
              <p class="md:text-md pt-4 text-center text-sm">
                There is no one with breakfast access.
              </p>
            </div>
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
import { ref } from 'vue'
import { GET_RESERVATIONS_WITH_BREAKFAST } from '../../graphql/query.reservation'
import NoData from '../../assets/svg/NoData.vue'

export default {
  components: {
    RouteHolder,
    AdminNavigation,
    AdminHeader,
    Search,
    Frown,
    NoData,
  },
  setup() {
    const { result, loading, error } = useQuery(GET_RESERVATIONS_WITH_BREAKFAST)
    const skeletons = ref<number>(6)
    return { result, loading, error, skeletons }
  },
}
</script>
