<template>
  <main class="flex h-full bg-themeWhite">
    <section class="flex h-full w-full">
      <admin-navigation />
      <div class="grid w-full grid-cols-2 gap-4 p-6 md:grid-cols-6 lg:grid-cols-7">
        <route-holder title="Home" />
        <div
          class="bg-themeGreen col-end-3 md:col-end-7 lg:col-end-8 flex h-12 w-12 cursor-pointer items-center justify-center justify-self-end rounded-full text-white shadow-md md:h-14 md:w-14 lg:h-16 lg:w-16"
        >
          <bell-ring />
          <div class="absolute ml-4 mt-4 h-2 w-2 rounded-full bg-red-600"></div>
        </div>
        <div
          class="col-start-1 col-end-3 row-start-2 row-end-3 md:col-start-2 justify-self-center"
        >
          <div class="absolute z-10 h-56 w-48 lg:h-60 lg:w-56 xl:h-68 xl:w-64 rounded-md bg-white shadow-lg">
            <div class="flex h-full flex-col justify-center">
              <p
                class="font-title lg:text-8xl text-themeGreen decoration-themeBrown decoration-4 pb-3 text-center text-7xl underline"
              >
                88
              </p>
              <p class="text-themeGreen text-center lg:p-3">Rooms available</p>
            </div>
          </div>
          <div class="bg-themeBrown z-0 m-2 h-56 w-48 lg:h-60 xl:h-68 xl:w-64  lg:w-56 rounded-md"></div>
        </div>
        <div
          class="col-start-1 col-end-3 md:col-start-6  row-start-3 md:row-start-2 lg:col-start-4 lg:col-end-5 row-end-4 justify-self-center"
        >
          <div class="absolute z-10 h-56 w-48 lg:h-60 xl:h-68 xl:w-64  lg:w-56 rounded-md bg-white shadow-lg">
            <div class="flex h-full flex-col justify-center">
              <p
                class="font-title lg:text-8xl text-themeGreen decoration-themeBrown decoration-4 pb-3 text-center text-7xl underline"
              >
                29
              </p>
              <p class="text-themeGreen text-center lg:p-3">Rooms to clean</p>
            </div>
          </div>
          <div class="bg-themeBrown z-0 m-2 h-56 w-48 lg:h-60 xl:h-68 xl:w-64  lg:w-56 rounded-md"></div>
        </div>
        <div
          class="col-start-1 col-end-3 md:col-start-2 row-start-4 row-end-5 lg:col-start-6 lg:col-end-7 lg:row-start-2 justify-self-center"
        >
          <div class="absolute z-10 h-56 w-48 lg:h-60 lg:w-56 xl:h-68 xl:w-64  rounded-md bg-white shadow-lg">
            <div class="flex h-full flex-col justify-center">
              <p
                class="font-title lg:text-8xl text-themeGreen decoration-themeBrown decoration-4 pb-3 text-center text-7xl underline"
              >
                6
              </p>
              <p class="text-themeGreen text-center lg:p-3">Ask for roomservice</p>
            </div>
          </div>
          <div class="bg-themeBrown z-0 m-2 h-56 w-48 lg:h-60 xl:h-68 xl:w-64  lg:w-56 rounded-md"></div>
        </div>
        <div
          class="col-start-1 col-end-3 row-start-5 row-end-6 md:row-start-4 md:row-end-5 md:col-start-2 md:col-end-7 lg:col-start-3 lg-col-end-4 justify-self-center"
        >
          <div class="absolute z-10 h-56 w-48 lg:h-60 lg:w-56 xl:h-68 xl:w-64  rounded-md bg-white shadow-lg">
            <div class="flex h-full flex-col justify-center">
              <p
                class="font-title text-themeGreen decoration-themeBrown decoration-4 lg:text-8xl pb-3 text-center text-7xl underline"
              >
                2
              </p>
              <p class="text-themeGreen text-center lg:p-3">Ask for wake up</p>
            </div>
          </div>
          <div class="bg-themeBrown z-0 m-2 h-56 w-48 lg:h-60 lg:w-56 xl:h-68 xl:w-64  rounded-md"></div>
        </div>
        <div
          class="col-start-1 col-end-3 row-start-6 row-end-7 md:col-start-2 md:col-end-5 lg:col-start-5 lg-col-end-6 lg:row-start-4 lg:row-end-5  justify-self-center"
        >
          <div class="absolute z-10 h-56 w-48 lg:h-60 lg:w-56 xl:h-68 xl:w-64  rounded-md bg-white shadow-lg">
            <div class="flex h-full flex-col justify-center">
              <p
                class="font-title text-themeGreen decoration-themeBrown decoration-4 pb-3 text-center text-7xl lg:text-8xl underline "
              >
                5
              </p>
              <p class="text-themeGreen text-center lg:p-3">Has access to breakfast room</p>
            </div>
          </div>
          <div class="bg-themeBrown z-0 m-2 h-56 w-48 lg:h-60 lg:w-56 xl:h-68 xl:w-64  rounded-md"></div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import RouteHolder from '../../components/holders/RouteHolder.vue'
import AdminNavigation from '../../components/generic/AdminNavigation.vue'
import { BellRing } from 'lucide-vue-next'
</script>
