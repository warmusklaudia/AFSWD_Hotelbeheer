<template>
  <main class="bg-themeWhite flex h-full">
    <section class="flex h-full w-full">
      <admin-navigation />
      <div class="w-5/6 p-6">
        <admin-header name="Add room" />
        <form class="m-6" @submit.prevent="">
          <div class="mt-3">
            <label
              class="mb-1 block text-neutral-500 focus-within:text-neutral-900"
              for="name"
            >
              <span class="mb-2 block">Name</span>
              <input
                id="name"
                class="border-themeBrown ring-themeBrown w-full rounded-md border px-3 py-1 text-neutral-800 outline-none focus-visible:ring lg:w-1/3"
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
                id="description"
                class="border-themeBrown ring-themeBrown w-full rounded-md border px-3 py-1 text-neutral-800 outline-none focus-visible:ring lg:w-1/3"
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
                id="rating"
                class="border-themeBrown ring-themeBrown w-full rounded-md border px-3 py-1 text-neutral-800 outline-none focus-visible:ring lg:w-1/3"
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
                id="category"
                class="border-themeBrown ring-themeBrown w-full rounded-md border px-3 py-1 text-neutral-800 outline-none focus-visible:ring lg:w-1/3"
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
                id="location"
                class="border-themeBrown ring-themeBrown w-full rounded-md border px-3 py-1 text-neutral-800 outline-none focus-visible:ring lg:w-1/3"
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
                id="access"
                class="border-themeBrown ring-themeBrown w-full rounded-md border px-3 py-1 text-neutral-800 outline-none focus-visible:ring lg:w-1/3"
                type="text"
                name="access"
              />
            </label>
          </div>
          <button
            class="border-themeBrown bg-themeOffWhite text-themeBrown focus:ring-themeBrown hover:bg-themeBrown flex items-center rounded-md border px-6 py-2 text-sm hover:bg-opacity-20 focus:outline-none focus:ring"
          >
            <Plus class="mr-2" size="20" />
            ADD ROOM
          </button>
        </form>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import RouteHolder from '../../../components/holders/RouteHolder.vue'
import AdminNavigation from '../../../components/generic/AdminNavigation.vue'
import AdminHeader from '../../../components/generic/AdminHeader.vue'
import { Search, Plus, Frown } from 'lucide-vue-next'
import { ref } from 'vue'
export default {
  components: {
    RouteHolder,
    AdminNavigation,
    AdminHeader,
    Search,
    Plus,
    Frown,
  },
  setup() {
    const skeletons = ref<number>(6)
    return {
      skeletons,
    }
  },
}
</script>
