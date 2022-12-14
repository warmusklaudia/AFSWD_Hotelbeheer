<template>
  <div class="bg-themeWhite flex h-full">
    <section class="flex h-full w-full">
      <admin-navigation />
      <div class="w-5/6 p-6">
        <admin-header
          :name="`${result?.reservation.user.firstName} ${result?.reservation.user.lastName}'s reservation`"
        />
        <div class="p-6 lg:flex lg:gap-6">
          <div v-if="loading">
            <p>Loading</p>
          </div>
          <div v-else-if="error">
            <p>Error happened.</p>
          </div>
          <div v-else-if="result">
            <div class="my-3 flex items-center gap-3">
              <Contact />
              <p class="text-sm tracking-wide">
                {{ result.reservation.user.firstName }}
                {{ result.reservation.user.lastName }}
              </p>
            </div>
            <div class="mb-3 flex items-center gap-3">
              <Calendar />
              <p class="text-sm tracking-wide">
                {{
                  new Date(
                    result.reservation.reservationStartDate,
                  ).toLocaleDateString()
                }}
                -
                {{
                  new Date(
                    result.reservation.reservationEndDate,
                  ).toLocaleDateString()
                }}
              </p>
            </div>
            <div
              v-for="x in result.reservation.rooms"
              class="mb-3 flex items-center gap-3"
            >
              <Bed />
              <p class="text-sm tracking-wide">
                {{ x.name }}
              </p>
            </div>
            <div class="mb-3 flex items-center gap-3">
              <Users />
              <p class="text-sm tracking-wide">
                {{ result.reservation.amountAdults }} adults
              </p>
            </div>
            <div class="mb-3 flex items-center gap-3">
              <Users />
              <p class="text-sm tracking-wide">
                {{ result.reservation.amountChildren }} children
              </p>
            </div>
            <div class="mb-3 flex items-center gap-3">
              <Banknote />
              <p class="text-sm tracking-wide">
                € {{ result.reservation.price }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import AdminNavigation from '../../../components/generic/AdminNavigation.vue'
import AdminHeader from '../../../components/generic/AdminHeader.vue'
import { Contact, Calendar, Bed, Users, Banknote } from 'lucide-vue-next'
import { useQuery } from '@vue/apollo-composable'
import { RESERVATION_BY_ID } from '../../../graphql/query.reservation'
import { watch } from 'vue'
import { useRoute } from 'vue-router'
export default {
  components: {
    AdminHeader,
    AdminNavigation,
    Contact,
    Calendar,
    Bed,
    Users,
    Banknote,
  },
  setup() {
    const { params } = useRoute()
    const { result, loading, error } = useQuery(RESERVATION_BY_ID, {
      id: params.id,
    })
    watch(result, () => {
      console.log(result.value.reservation)
    })
    return { result, loading, error }
  },
}
</script>
