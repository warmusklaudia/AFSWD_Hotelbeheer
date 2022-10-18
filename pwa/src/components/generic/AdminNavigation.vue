<template>
  <nav v-if="showNav"
    class="bg-themeOffWhite flex w-44 min-h-screen md:w-52 flex-col justify-between p-4 shadow-lg"
  >
    <section>
        <div class="flex justify-end -mr-8">
            <div @click="showNav = false"  class="bg-themeGreen rounded-full w-10 h-10 text-white flex justify-center items-center cursor-pointer shadow-md">
                <ChevronsLeft/>
            </div>
        </div>

      <div class="font-title my-6 flex flex-col items-center">
        <div
          class="bg-themeGreen w-18 h-18 flex items-center justify-center rounded-full"
        >
          <p class="text-xl text-white">KW</p>
        </div>
        <p class="text-themeGreen pt-2 lg:text-lg font-bold tracking-wider">
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
      class="text-themeGreen border-themeBrown font-title space-y-2 border-t border-opacity-25  text-sm lg:text-base"
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
  
  <div v-else class="bg-themeOffWhite flex min-h-screen w-11 flex-col justify-between p-4 shadow-lg">
    <div @click="showNav = true" class="flex justify-end -mr-8">
            <div class="bg-themeGreen rounded-full w-10 h-10 text-white flex justify-center items-center cursor-pointer shadow-md">
                <ChevronsRight/>
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
  ChevronsRight
} from 'lucide-vue-next'
import { ref, Ref } from 'vue';
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
    ChevronsRight
  },

  setup() {
    let showNav: Ref<boolean> = ref(true)

    return {
        showNav,
    }
  },
}
</script>
