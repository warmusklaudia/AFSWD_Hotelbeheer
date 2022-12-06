<template>
  <nav
    v-if="showNav"
    class="bg-themeOffWhite flex min-h-screen w-20 flex-col justify-between p-4 shadow-lg md:w-52"
  >
    <section>
      <div class="-mr-8 flex justify-end">
        <div
          @click="toggleNav()"
          class="bg-themeGreen hidden h-10 w-10 cursor-pointer items-center justify-center rounded-full text-white shadow-md md:flex"
        >
          <ChevronsLeft />
        </div>
      </div>

      <div class="font-title mb-6 mt-2 flex flex-col items-center">
        <div
          v-if="customUser?.imgUrl === ''"
          class="bg-themeGreen md:w-18 md:h-18 flex h-10 w-10 items-center justify-center rounded-full"
        >
          <p class="text-sm text-white md:text-xl">
            {{ customUser?.firstName[0] }}{{ customUser?.lastName[0] }}
          </p>
        </div>
        <img
          v-else
          class="md:w-18 md:h-18 h-10 w-10 rounded-full object-cover"
          :src="customUser?.imgUrl"
        />

        <label for="pic-upload">
          <div
            class="bg-themeBrown -mt-4 hidden cursor-pointer items-center justify-center rounded-full md:flex md:h-6 md:w-6"
          >
            <p class="text-sm text-white md:text-xl"><Plus size="18" /></p>
            <input
              class="hidden"
              @change="uploadPic"
              id="pic-upload"
              type="file"
              accept="image/*"
            />
          </div>
        </label>
        <p
          class="text-themeGreen hidden pt-2 text-center text-xs font-bold tracking-wider md:block md:text-base lg:text-lg"
        >
          {{ customUser?.firstName }} {{ customUser?.lastName }}
        </p>
      </div>
      <ul class="text-themeGreen font-title text-sm lg:text-base">
        <li>
          <router-link
            to="/admin/home"
            active-class="bg-themeBrown bg-opacity-20 font-bold"
            class="hover:bg-themeBrown focus:ring-themeBrown flex items-center rounded p-2 hover:bg-opacity-20 focus:outline-none focus:ring"
          >
            <Home />
            <p class="ml-3 hidden md:block">Home</p>
          </router-link>
        </li>
        <li>
          <router-link
            to="/admin/rooms"
            active-class="bg-themeBrown bg-opacity-20 font-bold"
            class="hover:bg-themeBrown focus:ring-themeBrown flex items-center rounded p-2 hover:bg-opacity-20 focus:outline-none focus:ring"
          >
            <BedDouble />
            <p class="ml-3 hidden md:block">Rooms</p>
          </router-link>
        </li>
        <li>
          <router-link
            to="/admin/cleaning"
            active-class="bg-themeBrown bg-opacity-20 font-bold"
            class="hover:bg-themeBrown focus:ring-themeBrown flex items-center rounded p-2 hover:bg-opacity-20 focus:outline-none focus:ring"
          >
            <ShowerHead />
            <p class="ml-3 hidden md:block">Cleaning</p>
          </router-link>
        </li>
        <li>
          <router-link
            to="/admin/services"
            active-class="bg-themeBrown bg-opacity-20 font-bold"
            class="hover:bg-themeBrown focus:ring-themeBrown flex items-center rounded p-2 hover:bg-opacity-20 focus:outline-none focus:ring"
          >
            <UserCog />
            <p class="ml-3 hidden md:block">Services</p>
          </router-link>
        </li>
        <li>
          <router-link
            to="/admin/breakfast-access"
            active-class="bg-themeBrown bg-opacity-20 font-bold"
            class="hover:bg-themeBrown focus:ring-themeBrown flex items-center rounded p-2 hover:bg-opacity-20 focus:outline-none focus:ring"
          >
            <Utensils />
            <p class="ml-3 hidden md:block">Breakfast access</p>
          </router-link>
        </li>
        <li>
          <router-link
            to="/admin/pricing"
            active-class="bg-themeBrown bg-opacity-20 font-bold"
            class="hover:bg-themeBrown focus:ring-themeBrown flex items-center rounded p-2 hover:bg-opacity-20 focus:outline-none focus:ring"
          >
            <Coins />
            <p class="ml-3 hidden md:block">Pricing</p>
          </router-link>
        </li>
        <li>
          <router-link
            to="/admin/users"
            active-class="bg-themeBrown bg-opacity-20 font-bold"
            class="hover:bg-themeBrown focus:ring-themeBrown flex items-center rounded p-2 hover:bg-opacity-20 focus:outline-none focus:ring"
          >
            <Users />
            <p class="ml-3 hidden md:block">Manage users</p>
          </router-link>
        </li>
      </ul>
    </section>

    <ul
      class="text-themeGreen border-themeBrown font-title space-y-2 border-t border-opacity-25 text-sm lg:text-base"
    >
      <li>
        <button
          @click="handleLogOut"
          class="hover:bg-themeBrown focus:ring-themeBrown my-6 flex w-full items-center rounded p-2 hover:bg-opacity-20 focus:outline-none focus:ring"
        >
          <LogOut />
          <p class="ml-3 hidden md:block">Log out</p>
        </button>
      </li>
    </ul>
  </nav>

  <div
    v-else
    class="bg-themeOffWhite flex min-h-screen w-11 flex-col justify-between p-4 shadow-lg"
  >
    <div @click="toggleNav()" class="-mr-8 flex justify-end">
      <div
        class="bg-themeGreen flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-white shadow-md"
      >
        <ChevronsRight />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Home,
  BedDouble,
  ShowerHead,
  UserCog,
  Utensils,
  Coins,
  Users,
  LogOut,
  ChevronsLeft,
  ChevronsRight,
  Plus,
} from 'lucide-vue-next'
import { reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import {
  getStorage,
  ref as refFirebase,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage'
import useAuthentication from '../../composables/useAuthentication'
import useCustomUser from '../../composables/useCustomUser'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { UPDATE_USER } from '../../graphql/mutation.user'
import { GET_CURRENT_USER } from '../../graphql/query.user'
export default {
  components: {
    Home,
    BedDouble,
    ShowerHead,
    UserCog,
    Utensils,
    Coins,
    LogOut,
    ChevronsLeft,
    ChevronsRight,
    Plus,
    Users,
  },

  setup() {
    const { logout, user } = useAuthentication()
    const { customUser, loadCustomUser } = useCustomUser()
    const storage = getStorage()
    const storageRef = refFirebase(storage, user.value?.uid)
    const userInput = reactive({
      id: customUser.value?.id,
      imgUrl: '',
      firstName: customUser.value?.firstName,
      lastName: customUser.value?.lastName,
      role: {
        name: customUser.value?.role.name,
      },
    })
    const {
      result: resultUser,
      loading: loadingUser,
      error: errUser,
    } = useQuery(GET_CURRENT_USER)
    const { mutate: updateUser } = useMutation(UPDATE_USER, () => ({
      variables: {
        updateUserInput: userInput,
      },
      update(cache, { data: { updateUser } }) {
        let data: any = cache.readQuery({ query: GET_CURRENT_USER })
        cache.writeQuery({
          query: GET_CURRENT_USER,
          data: {
            findByCurrentUserUid: updateUser,
          },
        })
      },
    }))
    const showNav = ref<boolean>(
      localStorage.adminNav ? localStorage.adminNav : true,
    )

    const toggleNav = async () => {
      showNav.value = !showNav.value
      localStorage.adminNav = !localStorage.adminNav
    }
    const uploadPic = async (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0]

      await uploadBytes(storageRef, file as Blob)
        .then(async () => {
          await Promise.all([getImg(), updateUser(), loadCustomUser()])
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
    getImg()

    const { replace } = useRouter()
    const handleLogOut = () => {
      logout().then(() => {
        return replace('/')
      })
    }
    return {
      showNav,
      customUser,
      handleLogOut,
      toggleNav,
      uploadPic,
    }
  },
}
</script>
