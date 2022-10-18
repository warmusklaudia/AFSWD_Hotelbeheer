<template>
  <nav
    v-if="showNav"
    class="bg-themeOffWhite flex min-h-screen w-44 flex-col justify-between p-4 shadow-lg md:w-52"
  >
    <section>
      <div class="-mr-8 flex justify-end">
        <div
          @click="showNav = false"
          class="bg-themeGreen flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-white shadow-md"
        >
          <ChevronsLeft />
        </div>
      </div>

      <div class="font-title mb-6 mt-2 flex flex-col items-center">
        <div
          class="bg-themeGreen w-18 h-18 flex items-center justify-center rounded-full"
        >
          <p class="text-xl text-white">KW</p>
        </div>
        <p class="text-themeGreen pt-2 font-bold tracking-wider lg:text-lg">
          Klaudia Warmus
        </p>
      </div>
      <ul class="text-themeGreen font-title text-sm lg:text-base">
        <li>
          <router-link
            to=""
            class="hover:bg-themeBrown flex items-center rounded p-2 hover:bg-opacity-20"
          >
            <Home />
            <p class="ml-3">Home</p>
          </router-link>
        </li>
        <li>
          <router-link
            to="#"
            class="hover:bg-themeBrown flex items-center rounded p-2 hover:bg-opacity-20"
          >
            <BedDouble />
            <p class="ml-3">Rooms</p>
          </router-link>
        </li>
        <li>
          <router-link
            to="#"
            class="hover:bg-themeBrown flex items-center rounded p-2 hover:bg-opacity-20"
          >
            <ShowerHead />
            <p class="ml-3">Cleaning</p>
          </router-link>
        </li>
        <li>
          <router-link
            to="#"
            class="hover:bg-themeBrown flex items-center rounded p-2 hover:bg-opacity-20"
          >
            <UserCog />
            <p class="ml-3">Services</p>
          </router-link>
        </li>
        <li>
          <router-link
            to="#"
            class="hover:bg-themeBrown flex items-center rounded p-2 hover:bg-opacity-20"
          >
            <Utensils />
            <p class="ml-3">Breakfast access</p>
          </router-link>
        </li>
        <li>
          <router-link
            to="#"
            class="hover:bg-themeBrown flex items-center rounded p-2 hover:bg-opacity-20"
          >
            <Coins />
            <p class="ml-3">Pricing</p>
          </router-link>
        </li>
        <li>
          <router-link
            to="#"
            class="hover:bg-themeBrown flex items-center rounded p-2 hover:bg-opacity-20"
          >
            <Luggage />
            <p class="ml-3">Guests</p>
          </router-link>
        </li>
      </ul>
    </section>

    <ul
      class="text-themeGreen border-themeBrown font-title space-y-2 border-t border-opacity-25 text-sm lg:text-base"
    >
      <li>
        <button
          class="hover:bg-themeBrown my-6 flex w-full items-center rounded p-2 hover:bg-opacity-20"
        >
          <LogOut />
          <p class="ml-3">Log out</p>
        </button>
      </li>
    </ul>
  </nav>

  <div
    v-else
    class="bg-themeOffWhite flex min-h-screen w-11 flex-col justify-between p-4 shadow-lg"
  >
    <div @click="showNav = true" class="-mr-8 flex justify-end">
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
  Luggage,
  LogOut,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-vue-next'
import { ref, Ref } from 'vue'
export default {
  components: {
    Home,
    BedDouble,
    ShowerHead,
    UserCog,
    Utensils,
    Coins,
    Luggage,
    LogOut,
    ChevronsLeft,
    ChevronsRight,
  },

  setup() {
    let showNav: Ref<boolean> = ref(true)

    return {
      showNav,
    }
  },
}
</script>
