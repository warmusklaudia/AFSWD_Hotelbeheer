<template>
  <main class="bg-themeWhite flex h-full">
    <section class="flex h-full w-full">
      <admin-navigation />
      <div class="w-5/6 p-6">
        <admin-header name="Add room" />
        <div class="lg:flex lg:items-center lg:gap-10">
          <form class="m-6" @submit.prevent="submitForm">
            <div
              v-if="errorMessage"
              class="mb-3 flex items-center justify-between rounded-md bg-red-100 px-3 py-1"
            >
              <p class="text-sm text-red-600">{{ errorMessage }}</p>

              <button
                @click="errorMessage = ''"
                class="rounded-full p-3 ring-red-600 hover:bg-red-200 focus:outline-none focus:ring-2"
              >
                <X class="h-4 w-4 text-red-600" />
              </button>
            </div>
            <div class="mt-3">
              <label
                class="mb-1 block text-neutral-500 focus-within:text-neutral-900"
                for="name"
              >
                <span class="mb-2 block">Name</span>
                <input
                  v-model="roomInput.name"
                  id="name"
                  class="border-themeBrown ring-themeBrown w-full rounded-md border px-3 py-1 text-neutral-800 outline-none focus-visible:ring"
                  type="text"
                  name="name"
                />
              </label>
            </div>
            <div class="mt-3">
              <label
                class="mb-1 block text-neutral-500 focus-within:text-neutral-900"
                for="description"
              >
                <span class="mb-2 block">Description</span>
                <textarea
                  v-model="roomInput.description"
                  id="description"
                  class="border-themeBrown ring-themeBrown w-full rounded-md border px-3 py-1 text-neutral-800 outline-none focus-visible:ring"
                  name="description"
                  cols="30"
                ></textarea>
              </label>
            </div>
            <div class="mt-3">
              <label
                class="mb-1 block text-neutral-500 focus-within:text-neutral-900"
                for="rating"
              >
                <span class="mb-2 block">Rating</span>
                <input
                  v-model="roomInput.rating"
                  id="rating"
                  class="border-themeBrown ring-themeBrown w-full rounded-md border px-3 py-1 text-neutral-800 outline-none focus-visible:ring"
                  type="number"
                  name="rating"
                />
              </label>
            </div>
            <div class="mt-3">
              <label
                class="mb-1 block text-neutral-500 focus-within:text-neutral-900"
                for="category"
              >
                <span class="mb-2 block">Category</span>
                <select
                  v-model="roomInput.category"
                  id="category"
                  class="border-themeBrown ring-themeBrown w-full rounded-md border px-3 py-1 text-neutral-800 outline-none focus-visible:ring"
                  name="category"
                >
                  <option value="Luxe">Luxe</option>
                  <option value="Standard">Standard</option>
                </select>
              </label>
            </div>
            <div class="mt-3">
              <label
                class="mb-1 block text-neutral-500 focus-within:text-neutral-900"
                for="location"
              >
                <span class="mb-2 block">Location</span>
                <input
                  v-model="roomInput.location"
                  id="location"
                  class="border-themeBrown ring-themeBrown w-full rounded-md border px-3 py-1 text-neutral-800 outline-none focus-visible:ring"
                  type="text"
                  name="location"
                />
              </label>
            </div>
            <div class="mt-3 pb-6">
              <label
                class="mb-1 block text-neutral-500 focus-within:text-neutral-900"
                for="access"
              >
                <span class="mb-2 block">Access code</span>
                <input
                  v-model="roomInput.reservationId"
                  id="access"
                  class="border-themeBrown ring-themeBrown w-full rounded-md border px-3 py-1 text-neutral-800 outline-none focus-visible:ring"
                  type="text"
                  name="access"
                />
              </label>
            </div>
            <button
              class="border-themeBrown bg-themeOffWhite text-themeBrown focus:ring-themeBrown hover:bg-themeBrown flex items-center rounded-md border px-6 py-2 text-sm hover:bg-opacity-20 focus:outline-none focus:ring"
              :disabled="loading"
            >
              <Plus class="mr-2" size="20" />
              ADD ROOM
            </button>
          </form>
          <div class="hidden w-1/2 lg:block">
            <img
              v-if="roomInput.category == 'Luxe'"
              class="mb-6 aspect-video w-full rounded-md object-cover shadow-md"
              :src="luxe"
              :alt="`picture of a ${roomInput.category}-suite`"
            />
            <img
              v-if="roomInput.category == 'Standard'"
              class="mb-6 aspect-video w-full rounded-md object-cover shadow-md"
              :src="standard"
              :alt="`picture of a ${roomInput.category}-suite`"
            />
            <div v-else></div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import RouteHolder from '../../../components/holders/RouteHolder.vue'
import AdminNavigation from '../../../components/generic/AdminNavigation.vue'
import AdminHeader from '../../../components/generic/AdminHeader.vue'
import { ADD_ROOM } from '../../../graphql/mutation.room'
import luxe from '../../../assets/luxe-suite.webp'
import standard from '../../../assets/standard-suite.webp'
import { Search, Plus, Frown, X } from 'lucide-vue-next'
import { reactive, ref, watch } from 'vue'
import { useMutation } from '@vue/apollo-composable'
export default {
  components: {
    RouteHolder,
    AdminNavigation,
    AdminHeader,
    Search,
    Plus,
    Frown,
    X,
  },
  setup() {
    const skeletons = ref<number>(6)
    const loading = ref<boolean>(false)
    const errorMessage = ref<string>('')

    const roomInput = reactive({
      name: '',
      description: '',
      reservationId: '0',
      rating: 5,
      category: '',
      location: '',
    })

    const { mutate: addRoom } = useMutation(ADD_ROOM, () => ({
      variables: {
        createRoomInput: roomInput,
      },
    }))

    const submitForm = async () => {
      loading.value = true
      const room = await addRoom()
        .catch((err) => {
          console.log({ err })

          errorMessage.value = err.message
        })
        .finally(() => {
          loading.value = false
        })

      console.log(room)
    }
    watch(roomInput, () => {
      console.log(roomInput.category)
    })

    return {
      roomInput,
      skeletons,
      errorMessage,
      loading,
      luxe,
      standard,
      submitForm,
    }
  },
}
</script>
