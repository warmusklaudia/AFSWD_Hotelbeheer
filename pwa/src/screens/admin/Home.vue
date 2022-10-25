<template>
  <main class="bg-themeWhite h-full">
    <section class="flex h-full w-full">
      <admin-navigation />
      <div
        class="grid w-5/6 grid-cols-2 gap-4 p-6 md:grid-cols-6 lg:grid-cols-7"
      >
        <admin-header class="col-start-1 col-end-8" name="Home" />
        <div
          class="col-start-1 col-end-3 row-start-2 row-end-3 justify-self-center md:col-start-2"
        >
          <div
            class="2xl:h-68 absolute z-10 h-56 w-48 rounded-md bg-white shadow-lg lg:h-60 lg:w-56 2xl:w-64"
          >
            <div class="flex h-full flex-col justify-center">
              <p
                class="font-title text-themeGreen decoration-themeBrown pb-3 text-center text-7xl underline decoration-4 lg:text-8xl"
              >
                88
              </p>
              <p class="text-themeGreen text-center lg:p-3">Rooms available</p>
            </div>
          </div>
          <div
            class="bg-themeBrown 2xl:h-68 z-0 m-2 h-56 w-48 rounded-md lg:h-60 lg:w-56 2xl:w-64"
          ></div>
        </div>
        <div
          class="col-start-1 col-end-3 row-start-3 row-end-4 justify-self-center md:col-start-6 md:row-start-2 lg:col-start-4 lg:col-end-5"
        >
          <div
            class="2xl:h-68 absolute z-10 h-56 w-48 rounded-md bg-white shadow-lg lg:h-60 lg:w-56 2xl:w-64"
          >
            <div class="flex h-full flex-col justify-center">
              <p
                class="font-title text-themeGreen decoration-themeBrown pb-3 text-center text-7xl underline decoration-4 lg:text-8xl"
              >
                29
              </p>
              <p class="text-themeGreen text-center lg:p-3">Rooms to clean</p>
            </div>
          </div>
          <div
            class="bg-themeBrown 2xl:h-68 z-0 m-2 h-56 w-48 rounded-md lg:h-60 lg:w-56 2xl:w-64"
          ></div>
        </div>
        <div
          class="col-start-1 col-end-3 row-start-4 row-end-5 justify-self-center md:col-start-2 lg:col-start-6 lg:col-end-7 lg:row-start-2"
        >
          <div
            class="2xl:h-68 absolute z-10 h-56 w-48 rounded-md bg-white shadow-lg lg:h-60 lg:w-56 2xl:w-64"
          >
            <div class="flex h-full flex-col justify-center">
              <p
                class="font-title text-themeGreen decoration-themeBrown pb-3 text-center text-7xl underline decoration-4 lg:text-8xl"
              >
                6
              </p>
              <p class="text-themeGreen text-center lg:p-3">
                Ask for roomservice
              </p>
            </div>
          </div>
          <div
            class="bg-themeBrown 2xl:h-68 z-0 m-2 h-56 w-48 rounded-md lg:h-60 lg:w-56 2xl:w-64"
          ></div>
        </div>
        <div
          class="lg-col-end-4 col-start-1 col-end-3 row-start-5 row-end-6 justify-self-center md:col-start-2 md:col-end-7 md:row-start-4 md:row-end-5 lg:col-start-3"
        >
          <div
            class="2xl:h-68 absolute z-10 h-56 w-48 rounded-md bg-white shadow-lg lg:h-60 lg:w-56 2xl:w-64"
          >
            <div class="flex h-full flex-col justify-center">
              <p
                class="font-title text-themeGreen decoration-themeBrown pb-3 text-center text-7xl underline decoration-4 lg:text-8xl"
              >
                2
              </p>
              <p class="text-themeGreen text-center lg:p-3">Ask for wake up</p>
            </div>
          </div>
          <div
            class="bg-themeBrown 2xl:h-68 z-0 m-2 h-56 w-48 rounded-md lg:h-60 lg:w-56 2xl:w-64"
          ></div>
        </div>
        <div
          class="lg-col-end-6 col-start-1 col-end-3 row-start-6 row-end-7 justify-self-center md:col-start-2 md:col-end-5 lg:col-start-5 lg:row-start-4 lg:row-end-5"
        >
          <div
            class="2xl:h-68 absolute z-10 h-56 w-48 rounded-md bg-white shadow-lg lg:h-60 lg:w-56 2xl:w-64"
          >
            <div class="flex h-full flex-col justify-center">
              <p
                class="font-title text-themeGreen decoration-themeBrown pb-3 text-center text-7xl underline decoration-4 lg:text-8xl"
              >
                5
              </p>
              <p class="text-themeGreen text-center lg:p-3">
                Has access to breakfast room
              </p>
            </div>
          </div>
          <div
            class="bg-themeBrown 2xl:h-68 z-0 m-2 h-56 w-48 rounded-md lg:h-60 lg:w-56 2xl:w-64"
          ></div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import RouteHolder from '../../components/holders/RouteHolder.vue'
import AdminNavigation from '../../components/generic/AdminNavigation.vue'
import AdminHeader from '../../components/generic/AdminHeader.vue'
import { BellRing } from 'lucide-vue-next'
</script>
