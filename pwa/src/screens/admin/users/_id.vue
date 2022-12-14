<template>
  <div class="bg-themeWhite flex h-full">
    <section class="flex h-full w-full">
      <admin-navigation />
      <div class="w-5/6 p-6">
        <admin-header
          :name="` ${result?.findByUid.firstName} ${result?.findByUid.lastName}`"
        />
        <div class="p-6 lg:flex lg:items-center lg:justify-between lg:gap-20">
          <div v-if="loading">
            <p>Loading</p>
          </div>
          <div v-else-if="error">
            <p>Error happened.</p>
          </div>
          <div v-else-if="result">
            <img
              v-if="result.findByUid.imgUrl"
              class="mb-6 mt-6 aspect-video h-36 w-40 rounded-md object-cover shadow-md md:h-48 md:w-56"
              :src="result.findByUid.imgUrl"
              :alt="`Picture of ${result.findByUid.firstName}`"
            />
            <img
              v-else
              class="mb-6 mt-6 aspect-video h-36 w-40 rounded-md object-cover shadow-md md:h-48 md:w-56"
              src="../../../assets/default_profile.jpg"
              :alt="`Default user picture`"
            />
            <p class="pt-2">
              Name:
              <span class="font-title pl-2 font-bold"
                >{{ result.findByUid.firstName }}
                {{ result.findByUid.lastName }}</span
              >
            </p>
            <p class="pt-2">
              Preferred language:
              <span
                v-if="result.findByUid.preferredLanguage"
                class="font-title pl-2 font-bold"
                >{{ result.findByUid.preferredLanguage }}</span
              >
              <span v-else class="font-title pl-2 font-bold">unknown</span>
            </p>
            <p class="pt-2">
              Amount credits:
              <span class="font-title pl-2 font-bold">{{
                result.findByUid.amountCredits
              }}</span>
            </p>
            <p class="pt-2">
              Role:
              <span class="font-title pl-2 font-bold">{{
                result.findByUid.role.name
              }}</span>
            </p>
            <div class="pb-6 md:flex md:gap-2">
              <router-link
                :to="`/admin/users/${result.findByUid.uid}/edit`"
                class="border-themeBrown bg-themeOffWhite text-themeBrown focus:ring-themeBrown hover:bg-themeBrown mb-2 mt-6 flex w-56 items-center justify-center rounded-md border px-6 py-2 text-sm hover:bg-opacity-20 focus:outline-none focus:ring md:mb-0 md:w-1/3 md:place-self-end lg:w-56"
              >
                <Edit class="mr-2" size="20" />
                EDIT PROFILE
              </router-link>
            </div>
          </div>
          <table class="w-full table-auto">
            <h1 class="font-title text-themeGreen text-xl font-bold">
              Reservations
            </h1>
            <tr class="text-left">
              <th class="p-3">Room</th>

              <th class="p-3">Period</th>

              <th class="p-3">Number of people</th>
            </tr>

            <tbody
              v-if="resultReservation?.findReservationsByUserId.length > 0"
            >
              <tr
                v-for="(r, i) of resultReservation.findReservationsByUserId"
                :class="i % 2 === 0 ? 'bg-themeOffWhite' : 'bg-white'"
                class="overflow-hidden rounded-md"
              >
                <td>{{ r.rooms[0].name }}</td>
                <td class="p-3">
                  {{ new Date(r.reservationStartDate).toLocaleDateString() }}
                  -
                  {{ new Date(r.reservationStartDate).toLocaleDateString() }}
                </td>
                <td class="p-3">{{ r.amountAdults + r.amountChildren }}</td>
              </tr>
            </tbody>
            <tbody class="grid w-full place-items-center" v-else>
              <p>No reservations yet.</p>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import RouteHolder from '../../../components/holders/RouteHolder.vue'
import AdminNavigation from '../../../components/generic/AdminNavigation.vue'
import AdminHeader from '../../../components/generic/AdminHeader.vue'
import luxe from '../../../assets/luxe-suite.webp'
import {
  Search,
  Plus,
  Frown,
  Eye,
  EyeOff,
  Star,
  Edit,
  Trash2,
  Loader2,
} from 'lucide-vue-next'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import { GET_USER_BY_UID } from '../../../graphql/query.user'
import { RESERVATIONS_BY_USER_ID } from '../../../graphql/query.reservation'
export default {
  components: {
    RouteHolder,
    AdminNavigation,
    AdminHeader,
    Search,
    Plus,
    Frown,
    Eye,
    EyeOff,
    Star,
    Edit,
    Trash2,
    Loader2,
  },
  setup() {
    const { params } = useRoute()
    const { push } = useRouter()
    const load = ref<boolean>(false)
    const { result, loading, error } = useQuery(GET_USER_BY_UID, {
      uid: params.id,
    })
    const {
      result: resultReservation,
      loading: loadingReservation,
      error: ErrorReservation,
    } = useQuery(RESERVATIONS_BY_USER_ID, {
      uid: params.id,
    })

    let showCode = ref<boolean>(false)

    return {
      result,
      loading,
      error,
      resultReservation,
      loadingReservation,
      ErrorReservation,
      params,
      luxe,
      showCode,
      load,
    }
  },
}
</script>
