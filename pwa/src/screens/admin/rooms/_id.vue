<template>
  <div class="bg-themeWhite flex h-full">
    <section class="flex h-full w-full">
      <admin-navigation />
      <div class="w-5/6 p-6">
        <admin-header :name="`Room ${result?.room.name}`" />
        <h2 class="font-title pl-6 font-bold">{{ result?.room.id }}</h2>
        <div class="p-6 lg:flex lg:justify-evenly lg:gap-6">
          <div v-if="loading">
            <p>Loading</p>
          </div>
          <div v-else-if="error">
            <p>Error happened.</p>
          </div>
          <div v-else-if="result">
            <img
              class="lg:w-94 mb-6 mt-6 aspect-video rounded-md object-cover shadow-md"
              :src="luxe"
              :alt="`picture of a -suite`"
            />
            <p class="leading-7 lg:max-w-sm">
              {{ result.room.description }}
            </p>
            <p class="pt-2">
              Category:
              <span class="font-title pl-2 font-bold">{{
                result.room.category
              }}</span>
            </p>
            <p class="pt-2">
              Location:
              <span class="font-title pl-2 font-bold">{{
                result.room.location
              }}</span>
            </p>
            <div class="flex items-center">
              <p class="pt-2">
                Access code:
                <span v-if="!showCode" class="font-title pl-1 font-bold"
                  >*****</span
                >
                <span v-else class="font-title pl-2 font-bold">{{
                  result.room.accessCode
                }}</span>
              </p>
              <button
                v-if="showCode"
                @click="showCode = !showCode"
                class="ml-2 hover:text-neutral-500"
              >
                <Eye />
              </button>
              <button
                v-else
                @click="showCode = !showCode"
                class="ml-2 hover:text-neutral-500"
              >
                <EyeOff />
              </button>
            </div>
            <div class="flex pt-2">
              <p class="pr-2">Rating:</p>
              <div class="text-transparent" v-for="n in result.room.rating">
                <Star class="fill-themeBrown" />
              </div>
            </div>

            <p class="pt-2 pb-4">
              Price per night:
              <span class="font-title pl-2 font-bold">120$</span>
            </p>
            <div class="pb-6 md:flex md:gap-2">
              <router-link
                :to="`/admin/rooms/${result.room.id}/edit`"
                class="border-themeBrown bg-themeOffWhite text-themeBrown focus:ring-themeBrown hover:bg-themeBrown mb-2 flex w-2/3 items-center justify-center rounded-md border px-6 py-2 text-sm hover:bg-opacity-20 focus:outline-none focus:ring md:mb-0 md:w-1/3 md:place-self-end lg:w-2/3"
              >
                <Edit class="mr-2" size="20" />
                EDIT ROOM
              </router-link>
              <button
                @click="deleteRoom"
                class="border-themeBrown bg-themeOffWhite text-themeBrown focus:ring-themeBrown hover:bg-themeBrown flex w-2/3 items-center justify-center rounded-md border px-6 py-2 text-sm hover:bg-opacity-20 focus:outline-none focus:ring md:w-1/3 md:place-self-end lg:w-2/3"
              >
                <div v-if="!load" class="flex">
                  <Trash2 class="mr-2" size="20" />
                  DELETE ROOM
                </div>
                <div v-else>
                  <Loader2 class="animate-spin" />
                </div>
              </button>
            </div>
          </div>
          <div class="lg:w-1/2">
            <h1 class="font-title pb-6 text-xl font-bold lg:text-2xl">
              Reservation history
            </h1>
            <reservation-history-table :reservations="[1, 2, 3]" />
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
import ReservationHistoryTable from '../../../components/rooms/ReservationHistoryTable.vue'
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
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMutation, useQuery } from '@vue/apollo-composable'
import Room from '../../../interfaces/interface.room'
import {
  GET_ROOMS,
  ROOM_BY_ID,
  ROOM_BY_NAME_CAT,
  ROOM_INSERT_DATA,
} from '../../../graphql/query.room'
import { DELETE_ROOM } from '../../../graphql/mutation.room'
import { makeReference, Reference } from '@apollo/client/cache'
export default {
  components: {
    RouteHolder,
    AdminNavigation,
    AdminHeader,
    ReservationHistoryTable,
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
    const { result, loading, error } = useQuery<{ room: Room }>(ROOM_BY_ID, {
      id: params.id,
    })

    const {
      result: result2,
      loading: loading2,
      error: error2,
    } = useQuery<{ rooms: Room[] }>(ROOM_BY_NAME_CAT, {
      searchRoomByName: '',
      searchRoomByCat: '',
    })
    const { mutate: removeRoom } = useMutation(DELETE_ROOM, () => ({
      variables: {
        id: params.id,
      },
      update(cache) {
        let data: any = cache.readQuery({
          query: ROOM_BY_NAME_CAT,
          variables: { searchRoomByName: '', searchRoomByCat: '' },
        })
        cache.writeQuery({
          query: ROOM_BY_NAME_CAT,
          variables: { searchRoomByName: '', searchRoomByCat: '' },
          data: {
            roomsByNameCat: data.roomsByNameCat.filter(
              (roomsByNameCat: Room) => roomsByNameCat.id !== params.id,
            ),
          },
        })
      },
    }))

    let showCode = ref<boolean>(false)

    const deleteRoom = async () => {
      await removeRoom()
        .catch((err) => {
          console.log({ err })
        })
        .finally(() => {
          load.value = false
        })
      push('/admin/rooms')
    }

    return {
      result,
      loading,
      error,
      params,
      luxe,
      showCode,
      load,
      removeRoom,
      deleteRoom,
    }
  },
}
</script>
