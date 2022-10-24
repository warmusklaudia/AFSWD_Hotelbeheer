<template>
  <main class="bg-themeWhite h-full">
    <section class="flex h-full w-full">
      <admin-navigation />
      <div class="w-5/6 p-6">
        <admin-header name="Services" />
        <div class="flex w-full flex-col p-6 md:flex-row">
          <div>
            <div
              @click="showDetails, (details = !details)"
              class="flex h-28 w-96 cursor-pointer items-center justify-between rounded-md bg-white p-3 shadow-md md:w-72 lg:w-96"
            >
              <div class="flex gap-4">
                <div
                  class="bg-themeGreen flex h-14 w-14 items-center justify-center rounded-full"
                >
                  <p class="font-title text-lg text-white">RW</p>
                </div>
                <div>
                  <h2 class="font-title text-lg">Ronald Wilson</h2>
                  <p>asks for room cleaning</p>
                </div>
              </div>

              <div
                class="bg-themeGreen flex h-10 w-10 items-center justify-center rounded-full text-white"
              >
                <MessageSquare />
              </div>
            </div>
          </div>
          <div v-if="details" class="pt-3 md:pt-0 md:pl-6">
            <div
              class="absolute flex h-80 w-80 flex-col justify-between rounded-md bg-white p-6 lg:h-96 lg:w-96"
            >
              <div>
                <div class="flex items-center gap-4 pb-6">
                  <div
                    class="bg-themeGreen flex h-14 w-14 items-center justify-center rounded-full"
                  >
                    <p class="font-title text-lg text-white">RW</p>
                  </div>
                  <h2 class="font-title text-lg">Ronald Wilson</h2>
                </div>
                <p>
                  <span>Room cleaning</span> asked on
                  <span>Tue 11 Oct 21:32</span>
                </p>
                <p>Message:</p>
                <p class="italic text-neutral-500">No message</p>
              </div>
              <button
                class="border-themeBrown bg-themeOffWhite text-themeBrown rounded-md border px-6 py-2 text-sm"
              >
                MARK AS RESOLVED
              </button>
            </div>
            <div
              class="bg-themeBrown m-2 h-80 w-80 rounded-md shadow-md lg:h-96 lg:w-96"
            ></div>
          </div>
          <div v-else class="pl-6">
            <div class="flex h-full w-full items-center justify-center">
              <h1 class="font-title text-xl text-neutral-500">
                Choose a service
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import RouteHolder from '../../components/holders/RouteHolder.vue'
import AdminNavigation from '../../components/generic/AdminNavigation.vue'
import AdminHeader from '../../components/generic/AdminHeader.vue'
import { MessageSquare } from 'lucide-vue-next'
import { Ref, ref } from 'vue'

export default {
  components: {
    RouteHolder,
    AdminNavigation,
    AdminHeader,
    MessageSquare,
  },
  setup() {
    const details: Ref<boolean> = ref(false)
    const showDetails = () => {
      console.log('show details')
    }
    return { showDetails, details }
  },
}
</script>
