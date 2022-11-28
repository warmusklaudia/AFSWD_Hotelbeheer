<template>
  <div class="bg-themeWhite h-full">
    <section class="flex h-full w-full">
      <admin-navigation />
      <div class="w-5/6 p-6">
        <admin-header name="Services" />
        <div class="flex w-full flex-col p-6 md:flex-row">
          <div>
            <div
              class="grid animate-pulse grid-cols-1 gap-12 md:mx-6"
              v-if="loading"
            >
              <div v-for="i of skeletons" :key="i">
                <div
                  class="@dark:bg-neutral-700 aspect-square h-28 w-96 rounded-md bg-neutral-300 md:w-72 lg:w-96"
                ></div>
                <p
                  class="@dark:bg-neutral-600 my-1 h-6 w-96 rounded bg-neutral-200 md:w-72 lg:w-96"
                ></p>
              </div>
            </div>
            <div class="flex items-center" v-else-if="error">
              <p class="ml-6 text-xl md:mr-2">Error happened</p>
              <Frown />
            </div>
            <div
              v-else-if="result"
              v-for="s of result.requestedServices"
              :key="s.id"
              @click="checkId(s.id)"
              class="mb-6 flex h-28 w-96 cursor-pointer items-center justify-between rounded-md bg-white p-3 shadow-md hover:opacity-90 md:w-72 lg:w-96"
            >
              <div class="flex gap-4">
                <div
                  class="bg-themeGreen flex h-14 w-14 items-center justify-center rounded-full"
                >
                  <p class="font-title text-lg text-white">
                    {{ s.user.firstName[0] }}{{ s.user.lastName[0] }}
                  </p>
                </div>
                <div>
                  <h2 class="font-title text-lg">
                    {{ s.user.firstName }} {{ s.user.lastName }}
                  </h2>
                  <p class="lowercase">
                    asks for
                    <span>{{ s.service.name }}</span>
                  </p>
                </div>
              </div>
              <p
                class="font-title absolute m-auto w-96 -rotate-12 text-center text-2xl font-bold text-red-800 opacity-60 md:w-72 lg:w-96"
                v-if="s.resolved"
              >
                RESOLVED
              </p>
              <div
                class="bg-themeGreen flex h-10 w-10 items-center justify-center rounded-full text-white"
              >
                <MessageSquare />
                <div
                  v-if="s.message"
                  class="absolute ml-4 mt-4 h-2 w-2 animate-ping rounded-full bg-red-500 opacity-60"
                ></div>
                <div
                  v-if="s.message"
                  class="absolute ml-4 mt-4 h-2 w-2 rounded-full bg-red-600"
                ></div>
              </div>
            </div>
          </div>
          <DetailsBlock :id="reqServiceId ? reqServiceId : ''" />
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import RouteHolder from '../../components/holders/RouteHolder.vue'
import AdminNavigation from '../../components/generic/AdminNavigation.vue'
import AdminHeader from '../../components/generic/AdminHeader.vue'
import DetailsBlock from '../../components/services/DetailsBlock.vue'
import { MessageSquare } from 'lucide-vue-next'
import { Ref, ref, watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { GET_REQUESTED_SERVICES } from '../../graphql/query.requestedService'
import { Frown } from 'lucide-vue-next'

export default {
  components: {
    RouteHolder,
    AdminNavigation,
    AdminHeader,
    DetailsBlock,
    MessageSquare,
    Frown,
  },
  setup() {
    const details = ref<boolean>(false)
    const skeletons = ref<number>(3)
    const reqServiceId = ref<string>('')
    const { result, loading, error } = useQuery(GET_REQUESTED_SERVICES)
    const checkId = (id: string) => {
      console.log(id)
      reqServiceId.value = id
    }

    return { details, result, loading, error, skeletons, reqServiceId, checkId }
  },
}
</script>
