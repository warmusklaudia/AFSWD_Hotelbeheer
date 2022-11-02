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
                :class="roomErrors.name ? 'focus-within:text-red-600' : ''"
                for="name"
              >
                <span
                  class="mb-2 block"
                  :class="roomErrors.name ? 'text-red-600' : ''"
                >
                  Name
                  {{ roomErrors.name ? `(${roomErrors.name})` : '' }}
                </span>
                <input
                  v-model="roomInput.name"
                  :class="
                    roomErrors.name
                      ? ' border-red-800 ring-red-800'
                      : 'border-themeBrown ring-themeBrown '
                  "
                  id="name"
                  class="w-full rounded-md border px-3 py-1 text-neutral-800 outline-none focus-visible:ring"
                  type="text"
                  name="name"
                />
              </label>
            </div>
            <div class="mt-3">
              <label
                class="mb-1 block text-neutral-500 focus-within:text-neutral-900"
                :class="
                  roomErrors.description ? 'focus-within:text-red-600' : ''
                "
                for="description"
              >
                <span
                  class="mb-2 block"
                  :class="roomErrors.description ? 'text-red-600' : ''"
                >
                  Description
                  {{
                    roomErrors.description ? `(${roomErrors.description})` : ''
                  }}
                </span>
                <textarea
                  v-model="roomInput.description"
                  :class="
                    roomErrors.description
                      ? ' border-red-800 ring-red-800'
                      : 'border-themeBrown ring-themeBrown '
                  "
                  id="description"
                  class="w-full rounded-md border px-3 py-1 text-neutral-800 outline-none focus-visible:ring"
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
                  min="1"
                  max="5"
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
                :class="roomErrors.category ? 'focus-within:text-red-600' : ''"
                for="category"
              >
                <span
                  class="mb-2 block"
                  :class="roomErrors.category ? 'text-red-600' : ''"
                >
                  Category
                  {{ roomErrors.category ? `(${roomErrors.category})` : '' }}
                </span>
                <select
                  v-model="roomInput.category"
                  :class="
                    roomErrors.category
                      ? ' border-red-800 ring-red-800'
                      : 'border-themeBrown ring-themeBrown  '
                  "
                  id="category"
                  class="w-full rounded-md border px-3 py-1 text-neutral-800 outline-none focus-visible:ring"
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
                :class="roomErrors.location ? 'focus-within:text-red-600' : ''"
                for="location"
              >
                <span
                  class="mb-2 block"
                  :class="roomErrors.location ? 'text-red-600' : ''"
                >
                  Location
                  {{ roomErrors.location ? `(${roomErrors.location})` : '' }}
                </span>
                <input
                  v-model="roomInput.location"
                  :class="
                    roomErrors.location
                      ? ' border-red-800 ring-red-800'
                      : 'border-themeBrown ring-themeBrown  '
                  "
                  id="location"
                  class="w-full rounded-md border px-3 py-1 text-neutral-800 outline-none focus-visible:ring"
                  type="text"
                  name="location"
                />
              </label>
            </div>
            <div class="mt-3 pb-6">
              <label
                class="mb-1 block text-neutral-500 focus-within:text-neutral-900"
                :class="
                  roomErrors.accessCode ? 'focus-within:text-red-600' : ''
                "
                for="access"
              >
                <span
                  class="mb-2 block"
                  :class="roomErrors.accessCode ? 'text-red-600' : ''"
                >
                  Access code
                  {{
                    roomErrors.accessCode ? `(${roomErrors.accessCode})` : ''
                  }}
                </span>
                <input
                  v-model="roomInput.accessCode"
                  :class="
                    roomErrors.accessCode
                      ? ' border-red-800 ring-red-800'
                      : 'border-themeBrown ring-themeBrown '
                  "
                  id="access"
                  class="w-full rounded-md border px-3 py-1 text-neutral-800 outline-none focus-visible:ring"
                  type="text"
                  name="access"
                />
              </label>
            </div>
            <button
              class="border-themeBrown bg-themeOffWhite text-themeBrown focus:ring-themeBrown hover:bg-themeBrown flex items-center rounded-md border px-6 py-2 text-sm hover:bg-opacity-20 focus:outline-none focus:ring"
              :disabled="loading"
            >
              <div class="flex" v-if="!loading">
                <Plus class="mr-2" size="20" />
                ADD ROOM
              </div>
              <div v-else>
                <Loader2 class="animate-spin" />
              </div>
            </button>
            <p class="pt-3 text-green-700 lg:text-lg">{{ successMessage }}</p>
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
import { Search, Plus, Frown, X, Loader2 } from 'lucide-vue-next'
import { reactive, ref, watch } from 'vue'
import { useMutation } from '@vue/apollo-composable'
import { Room } from '../../../interfaces/interface.room'
import { GET_ROOMS } from '../../../graphql/query.room'
export default {
  components: {
    RouteHolder,
    AdminNavigation,
    AdminHeader,
    Search,
    Plus,
    Frown,
    X,
    Loader2,
  },
  setup() {
    const skeletons = ref<number>(6)
    const loading = ref<boolean>(false)
    const errorMessage = ref<string>('')
    const successMessage = ref<string>('')

    const roomErrors = reactive({
      name: '',
      description: '',
      category: '',
      location: '',
      accessCode: '',
    })

    const roomInput = reactive({
      name: '',
      description: '',
      rating: 1,
      category: '',
      location: '',
      accessCode: '',
    })

    const { mutate: addRoom } = useMutation(ADD_ROOM, () => ({
      variables: {
        createRoomInput: roomInput,
      },
    }))

    const isFormInvalid = (): boolean => {
      let hasErrors: boolean = false
      if (roomInput.name === '') {
        roomErrors.name = 'Name is required'
        hasErrors = true
      } else {
        roomErrors.name = ''
      }

      if (roomInput.description === '') {
        roomErrors.description = 'Description is required'
        hasErrors = true
      } else {
        roomErrors.description = ''
      }

      if (roomInput.category === '') {
        roomErrors.category = 'Category is required'
        hasErrors = true
      } else {
        roomErrors.category = ''
      }

      if (roomInput.location === '') {
        roomErrors.location = 'Location is required'
        hasErrors = true
      } else {
        roomErrors.location = ''
      }

      if (roomInput.accessCode === '') {
        roomErrors.accessCode = 'Access code is required'
        hasErrors = true
      } else if (roomInput.accessCode.length < 4) {
        roomErrors.accessCode = 'Access code is too short'
        hasErrors = true
      } else {
        roomErrors.accessCode = ''
      }

      if (hasErrors) return true
      return false
    }

    const submitForm = async () => {
      if (isFormInvalid()) return
      loading.value = true
      await addRoom()
        .catch((err) => {
          console.log({ err })

          errorMessage.value = err.message
        })
        .finally(() => {
          loading.value = false
          successMessage.value = 'Room successfully added'
          roomInput.name = ''
          roomInput.description = ''
          roomInput.rating = 1
          roomInput.category = ''
          roomInput.location = ''
          roomInput.accessCode = ''
        })
    }

    return {
      roomInput,
      roomErrors,
      skeletons,
      errorMessage,
      successMessage,
      loading,
      luxe,
      standard,
      submitForm,
    }
  },
}
</script>
