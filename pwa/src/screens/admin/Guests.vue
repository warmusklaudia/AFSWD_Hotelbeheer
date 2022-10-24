<template>
  <main class="bg-themeWhite flex h-full">
    <section class="flex h-full w-full">
      <admin-navigation />
      <div class="w-5/6 p-6">
        <admin-header name="Guests" />
        <div className="p-6 md:flex">
          <label for="rooms" class="relative block w-11/12 md:w-2/3 lg:w-1/3">
            <Search
              class="pointer-events-none absolute top-1/2 ml-2 -translate-y-1/2 transform text-neutral-400"
            />
            <input
              type="text"
              name="rooms"
              id="rooms"
              className="w-full border rounded-md border-themeBrown pl-10 py-2 block focus:outline-none focus:ring focus:ring-themeBrown"
              placeholder="Search"
            />
          </label>
          <div class="pt-2 md:ml-3 md:flex md:items-center md:pt-0">
            <label
              for="roomsAvailable"
              class="flex cursor-pointer items-center"
            >
              <div class="relative">
                <input
                  id="roomsAvailable"
                  type="checkbox"
                  class="peer sr-only"
                />
                <div
                  class="peer-checked:bg-themeBrown h-4 w-10 rounded-full bg-gray-400 shadow-inner"
                ></div>
                <div
                  class="absolute -left-1 -top-1 h-6 w-6 rounded-full bg-white shadow transition peer-checked:translate-x-full"
                ></div>
              </div>
              <div class="ml-3">Show old guests</div>
            </label>
          </div>
        </div>
        <div></div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import RouteHolder from '../../components/holders/RouteHolder.vue'
import AdminNavigation from '../../components/generic/AdminNavigation.vue'
import AdminHeader from '../../components/generic/AdminHeader.vue'
import { Search } from 'lucide-vue-next'
</script>
