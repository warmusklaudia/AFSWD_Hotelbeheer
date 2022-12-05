<template>
  <div class="bg-themeWhite flex h-full">
    <section class="flex h-full w-full">
      <admin-navigation />
      <div class="w-5/6 p-6">
        <admin-header
          :name="`Edit User ${result?.findByUid.firstName} ${result?.findByUid.lastName}`"
        />
        <div class="lg:flex lg:items-center lg:gap-10">
          <form class="m-6 md:flex md:gap-16" @submit.prevent="submitForm">
            <div>
              <div
                v-if="errorMessage"
                class="mb-3 flex items-center justify-between rounded-md bg-red-100 px-3 py-1"
              >
                <AlertTriangle class="text-red-600" />
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
                  :class="
                    userErrors.firstName ? 'focus-within:text-red-600' : ''
                  "
                  for="firstName"
                >
                  <span
                    class="mb-2 block"
                    :class="userErrors.firstName ? 'text-red-600' : ''"
                  >
                    First name
                    {{
                      userErrors.firstName ? `(${userErrors.firstName})` : ''
                    }}
                  </span>
                  <input
                    v-model="userInput.firstName"
                    :class="
                      userErrors.firstName
                        ? ' border-red-800 ring-red-800'
                        : 'border-themeBrown ring-themeBrown '
                    "
                    id="firstName"
                    class="w-full rounded-md border px-3 py-1 text-neutral-800 outline-none focus-visible:ring"
                    type="text"
                    name="firstName"
                  />
                </label>
              </div>
              <div class="mt-3">
                <label
                  class="mb-1 block text-neutral-500 focus-within:text-neutral-900"
                  :class="
                    userErrors.lastName ? 'focus-within:text-red-600' : ''
                  "
                  for="lastName"
                >
                  <span
                    class="mb-2 block"
                    :class="userErrors.lastName ? 'text-red-600' : ''"
                  >
                    Last name
                    {{ userErrors.lastName ? `(${userErrors.lastName})` : '' }}
                  </span>
                  <input
                    v-model="userInput.lastName"
                    :class="
                      userErrors.lastName
                        ? ' border-red-800 ring-red-800'
                        : 'border-themeBrown ring-themeBrown '
                    "
                    id="lastName"
                    class="w-full rounded-md border px-3 py-1 text-neutral-800 outline-none focus-visible:ring"
                    name="lastName"
                    type="text"
                  />
                </label>
              </div>
              <div class="mt-3">
                <label
                  class="mb-1 block text-neutral-500 focus-within:text-neutral-900"
                  :class="
                    userErrors.preferredLanguage
                      ? 'focus-within:text-red-600'
                      : ''
                  "
                  for="preferredLanguage"
                >
                  <span
                    class="mb-2 block"
                    :class="userErrors.preferredLanguage ? 'text-red-600' : ''"
                  >
                    Preferred language
                    {{
                      userErrors.preferredLanguage
                        ? `(${userErrors.preferredLanguage})`
                        : ''
                    }}
                  </span>
                  <select
                    v-model="userInput.preferredLanguage"
                    :class="
                      userErrors.preferredLanguage
                        ? ' border-red-800 ring-red-800'
                        : 'border-themeBrown ring-themeBrown  '
                    "
                    id="preferredLanguage"
                    class="w-full rounded-md border px-3 py-1 text-neutral-800 outline-none focus-visible:ring"
                    name="preferredLanguage"
                  >
                    <option value="en">en</option>
                    <option value="nl">nl</option>
                  </select>
                </label>
                <div class="mt-3 flex items-center">
                  <input
                    :checked="result?.findByUid.role.name === 'admin'"
                    v-model="userInput.role.name"
                    id="admin"
                    type="radio"
                    value="admin"
                    name="role"
                    class="accent-themeBrown focus:ring-themeBrown h-4 w-4 rounded-full border-gray-300 bg-gray-100"
                  />
                  <label
                    for="admin"
                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >Admin
                  </label>
                </div>
                <div class="flex items-center pb-4">
                  <input
                    :checked="result?.findByUid.role.name === 'user'"
                    v-model="userInput.role.name"
                    id="user"
                    type="radio"
                    value="user"
                    name="role"
                    class="accent-themeBrown focus:ring-themeBrown h-4 w-4 border-gray-300 bg-gray-100"
                  />
                  <label
                    for="user"
                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >User</label
                  >
                </div>
              </div>

              <button
                class="border-themeBrown bg-themeOffWhite text-themeBrown focus:ring-themeBrown hover:bg-themeBrown flex items-center rounded-md border px-6 py-2 text-sm hover:bg-opacity-20 focus:outline-none focus:ring"
                :disabled="load"
              >
                <div class="flex" v-if="!load">CONFIRM</div>
                <div v-else>
                  <Loader2 class="animate-spin" />
                </div>
              </button>
              <p class="pt-3 text-green-700 lg:text-lg">{{ successMessage }}</p>
            </div>
            <div class="flex flex-col items-center">
              <img
                v-if="
                  userInput.imgUrl === '' && result?.findByUid.imgUrl === ''
                "
                class="mt-6 aspect-video h-36 w-40 rounded-md object-cover shadow-md md:h-48 md:w-56"
                src="../../../assets/default_profile.jpg"
                alt="default profile picture"
              />
              <img
                v-else
                class="mt-6 aspect-video h-36 w-40 rounded-md object-cover shadow-md md:h-48 md:w-56"
                :src="userInput.imgUrl"
                :alt="`picture of ${result?.findByUid.firstName}`"
              />
              <label for="uploadPic">
                <div
                  class="bg-themeBrown -mt-3 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
                >
                  <p class="text-sm text-white md:text-xl">
                    <Plus size="24" />
                  </p>
                  <input
                    class="hidden"
                    id="uploadPic"
                    type="file"
                    accept="image/*"
                    @change="uploadPic"
                  />
                </div>
              </label>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import RouteHolder from '../../../components/holders/RouteHolder.vue'
import AdminNavigation from '../../../components/generic/AdminNavigation.vue'
import AdminHeader from '../../../components/generic/AdminHeader.vue'
import { UPDATE_ROOM } from '../../../graphql/mutation.room'
import luxe from '../../../assets/luxe-suite.webp'
import standard from '../../../assets/standard-suite.webp'
import { Search, Plus, Frown, X, Loader2, AlertTriangle } from 'lucide-vue-next'
import { reactive, ref, watch } from 'vue'
import { useMutation, useQuery } from '@vue/apollo-composable'
import Room from '../../../interfaces/interface.room'
import { GET_ROOMS, ROOM_BY_ID } from '../../../graphql/query.room'
import { useRoute } from 'vue-router'
import { GET_USER_BY_UID } from '../../../graphql/query.user'
import { UPDATE_USER } from '../../../graphql/mutation.user'
import {
  getDownloadURL,
  getStorage,
  ref as refFirebase,
  uploadBytes,
} from '@firebase/storage'
import useCustomUser from '../../../composables/useCustomUser'
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
    AlertTriangle,
  },
  setup() {
    const skeletons = ref<number>(6)
    const load = ref<boolean>(false)
    const errorMessage = ref<string>('')
    const successMessage = ref<string>('')
    const storage = getStorage()
    const { loadCustomUser } = useCustomUser()
    const { params } = useRoute()
    const storageRef = refFirebase(storage, params.id.toString())

    const { result, loading, error, refetch } = useQuery(GET_USER_BY_UID, {
      uid: params.id,
    })

    const userErrors = reactive({
      firstName: '',
      lastName: '',
      preferredLanguage: '',
    })

    const userInput = reactive({
      id: '',
      firstName: '',
      lastName: '',
      preferredLanguage: '',
      imgUrl: '',
      role: {
        name: '',
      },
    })

    watch(result, () => {
      userInput.id = result.value.findByUid.id
      userInput.firstName = result.value.findByUid.firstName
      userInput.lastName = result.value.findByUid.lastName
      userInput.preferredLanguage = result.value.findByUid.preferredLanguage
      userInput.imgUrl = result.value.findByUid.imgUrl
      userInput.role.name = result.value.findByUid.role.name
    })

    const uploadPic = async (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0]

      uploadBytes(storageRef, file as Blob)
        .then(() => {
          Promise.all([getImg(), updateUser(), loadCustomUser()])
        })
        .catch((err) => {
          console.log(err)
        })
    }

    const getImg = () => {
      getDownloadURL(storageRef).then((link) => {
        userInput.imgUrl = link
      })
    }

    const { mutate: updateUser } = useMutation(UPDATE_USER, () => ({
      variables: {
        updateUserInput: userInput,
      },
    }))
    const isFormInvalid = (): boolean => {
      let hasErrors: boolean = false
      if (userInput.firstName === '') {
        userErrors.firstName = 'First name is required'
        hasErrors = true
      } else {
        userErrors.firstName = ''
      }

      if (userInput.lastName === '') {
        userErrors.lastName = 'Description is required'
        hasErrors = true
      } else {
        userErrors.lastName = ''
      }

      if (userInput.preferredLanguage === '') {
        userErrors.preferredLanguage = 'Category is required'
        hasErrors = true
      } else {
        userErrors.preferredLanguage = ''
      }

      if (hasErrors) return true
      return false
    }

    const submitForm = async () => {
      if (isFormInvalid()) return
      load.value = true
      await updateUser()
        .then(() => {
          refetch()
        })
        .catch((err) => {
          console.log({ err })

          errorMessage.value = err.message
        })
        .finally(() => {
          load.value = false
          successMessage.value = 'User successfully updated'
        })
    }

    return {
      result,
      loading,
      error,
      userInput,
      userErrors,
      skeletons,
      errorMessage,
      successMessage,
      load,
      luxe,
      standard,
      submitForm,
      uploadPic,
    }
  },
}
</script>
