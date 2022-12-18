<template>
  <RouteHolder title="Reservations">
    <template #header-actions>
      <router-link
        to="/reservations/add"
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
      <RouterLink
        :to="`reservations/${r.id}`"
        v-if="result.findReservationsByUserId.length > 0"
        v-for="r of result.findReservationsByUserId"
        :key="r.id"
        class="flex max-h-56 flex-col justify-between rounded p-4 shadow-md"
      >
        <h2 class="font-title border-b-2 border-black pb-3 text-lg font-bold">
          Reservation
        </h2>
        <div class="mb-3 flex items-center gap-3">
          <Calendar />
          <p class="text-sm font-semibold tracking-wide">
            {{ new Date(r.reservationStartDate).toLocaleDateString() }} -
            {{ new Date(r.reservationEndDate).toLocaleDateString() }}
          </p>
        </div>
        <div>
          <div class="flex items-center gap-3">
            <Users />
            <p class="text-sm font-semibold tracking-wide">
              {{ r.amountAdults }} adults
            </p>
          </div>
          <div class="flex items-center gap-3">
            <Users />
            <p class="text-sm font-semibold tracking-wide">
              {{ r.amountChildren }} children
            </p>
          </div>
        </div>
        <div class="mt-3 flex items-center gap-3">
          <Banknote />
          <p class="text-sm font-semibold tracking-wide">€ {{ r.price }}</p>
        </div>
      </RouterLink>
      <div class="flex flex-col opacity-80 md:items-end" v-else>
        <NoData class="h-48 w-48 md:h-56 md:w-56" />
        <p class="md:text-md pt-4 text-sm md:text-center">
          There are no reservations yet.
        </p>
      </div>
    </div>
  </RouteHolder>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { Calendar, Banknote, Users } from 'lucide-vue-next'

import RouteHolder from '../../components/holders/RouteHolder.vue'
import useAuthentication from '../../composables/useAuthentication'
import { GET_RESERVATIONS_BY_USER_ID } from '../../graphql/query.reservation'
import NoData from '../../assets/svg/NoData.vue'

const { user } = useAuthentication()

const { result, loading, error } = useQuery(
  GET_RESERVATIONS_BY_USER_ID,
  () => ({
    uid: user.value?.uid!,
  }),
)

const skeletons: Ref<number> = ref(18)
</script>
