<template>
    <main class="bg-themeWhite flex h-full">
      <section class="flex h-full w-full">
        <admin-navigation />
        <div class="w-5/6 p-6">
          <route-holder title="Cleaning" />
          <div className="p-6 md:flex">
            <label for="rooms" class="relative block w-11/12 md:w-2/3 lg:w-1/3">
              <Search class="pointer-events-none absolute top-1/2 transform -translate-y-1/2 ml-2 text-neutral-400" />
              <input
                type="text" 
                name="rooms"
                id="rooms"
                className="w-full border rounded-md border-themeBrown pl-10 py-2 block"
                placeholder="Search"
              />
            </label>
            <div class="md:flex md:items-center pt-2 md:pt-0 md:ml-3">
              <label 
                  for="roomsAvailable"
                  class="flex items-center cursor-pointer"
              >
                  <div class="relative">
                  <input id="roomsAvailable" type="checkbox" class="sr-only peer" />
                  <div class="w-10 h-4 bg-gray-400 peer-checked:bg-themeBrown rounded-full shadow-inner"></div>
                  <div class="peer-checked:translate-x-full absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
                  </div>
                  <div class="ml-3">
                  Show cleaned
                  </div>
              </label>
              </div>
          </div>
          <div>
          </div>
        </div>
      </section>
    </main>
    
  </template>
  
  <script setup lang="ts">
  import RouteHolder from '../../components/holders/RouteHolder.vue'
  import AdminNavigation from '../../components/generic/AdminNavigation.vue'
  import { Search } from 'lucide-vue-next'
  </script>
  