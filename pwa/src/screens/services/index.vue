<template>
  <RouteHolder title="Services">
    <template #header-actions>
      <router-link
        to="/services/add"
        class="bg-themeOffWhite text-themeBrown border-themeBrown rounded-md border px-4 py-2"
      >
        Add
      </router-link>
    </template>
    <div
      class="grid animate-pulse gap-12 sm:grid-cols-2 md:grid-cols-3"
      v-if="loading"
    >
      <div v-for="i of skeletons" :key="i">
        <div
          class="@dark:bg-neutral-700 aspect-video rounded-md bg-neutral-300"
        ></div>
        <p
          class="@dark:bg-neutral-600 my-1 h-6 w-24 rounded bg-neutral-200"
        ></p>
        <p
          class="@dark:bg-neutral-600 my-2 h-6 w-12 rounded bg-neutral-100"
        ></p>
      </div>
    </div>
    <div v-else-if="error">
      <p>Error happened.</p>
    </div>
    <div class="grid gap-12 sm:grid-cols-2 md:grid-cols-3" v-else-if="result">
      <div
        v-for="rs of result.findRequestedServicesByUserId"
        :key="rs.id"
        v-if="result.findRequestedServicesByUserId.length > 0"
        class="flex max-h-56 flex-col justify-between rounded p-4 shadow-md"
      >
        <h2 class="font-title border-b-2 border-black pb-3 text-lg font-bold">
          {{ rs.service.name }}
        </h2>
        <div class="flex items-center gap-3">
          <Calendar />
          <p class="text-sm font-semibold tracking-wide">
            {{ new Date(rs.requestedDate).toLocaleDateString() }}
          </p>
        </div>
        <!-- <div>
                    <div class="flex gap-3 items-center">
                        <Users />
                        <p class="text-sm font-semibold tracking-wide">{{ r.amountAdults }} adults</p>
                    </div>
                    <div class="flex gap-3 items-center">
                        <Users />
                        <p class="text-sm font-semibold tracking-wide">{{ r.amountChildren }} children</p>
                    </div>
                </div> -->
        <div class="mb-3 flex items-center gap-3">
          <Banknote />
          <p class="text-sm font-semibold tracking-wide">
            € {{ rs.service.price }}
          </p>
        </div>
      </div>
      <div class="flex flex-col opacity-80 md:items-end" v-else>
        <NoData class="h-48 w-48 md:h-56 md:w-56" />
        <p class="md:text-md pt-4 text-sm md:text-center">
          There are no requested services.
        </p>
      </div>
    </div>
  </RouteHolder>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { ref } from 'vue'
import { Banknote, Calendar } from 'lucide-vue-next'
import NoData from '../../assets/svg/NoData.vue'
import RouteHolder from '../../components/holders/RouteHolder.vue'
import { GET_REQUESTED_SERVICES_BY_USER_ID } from '../../graphql/query.requestedService'

import useAuthentication from '../../composables/useAuthentication'

const { user } = useAuthentication()

const { result, loading, error } = useQuery(
  GET_REQUESTED_SERVICES_BY_USER_ID,
  () => ({
    uid: user.value?.uid!,
  }),
)

const skeletons = ref(6)
</script>
