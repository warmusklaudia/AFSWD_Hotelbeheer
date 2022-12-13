<template>
  <div class="bg-themeWhite h-full">
    <section class="flex h-full w-full">
      <admin-navigation />
      <div class="w-5/6 p-6">
        <admin-header name="Services" />
        <div
          class="flex w-full flex-col p-6 md:max-h-[65vh] md:flex-row md:overflow-y-auto lg:max-h-[70vh]"
        >
          <div>
            <div
              class="grid animate-pulse grid-cols-1 gap-12 md:mx-6"
              v-if="loading"
            >
              <div v-for="i of skeletons" :key="i">
                <div
                  class="aspect-square h-28 w-96 rounded-md bg-neutral-300 md:w-72 lg:w-96"
                ></div>
                <p
                  class="my-1 h-6 w-96 rounded bg-neutral-200 md:w-72 lg:w-96"
                ></p>
              </div>
            </div>
            <div class="flex items-center" v-else-if="error">
              <p class="ml-6 text-xl md:mr-2">Error happened</p>
              <Frown />
            </div>
            <div
              v-else-if="result"
              v-if="result.requestedServices.length > 0"
              v-for="s of result.requestedServices"
              :key="s.id"
              @click="checkId(s.id)"
              class="relative mb-6 flex h-20 w-56 cursor-pointer items-center justify-between rounded-md bg-white p-3 shadow-md hover:opacity-90 md:h-28 md:max-h-[65vh] md:w-72 lg:max-h-[70vh] lg:w-96"
            >
              <div class="flex gap-2 md:gap-4">
                <div
                  class="bg-themeGreen flex h-10 w-10 items-center justify-center rounded-full md:h-14 md:w-14"
                >
                  <p class="font-title text-sm text-white md:text-lg">
                    {{ s.user.firstName[0] }}{{ s.user.lastName[0] }}
                  </p>
                </div>
                <div>
                  <h2 class="font-title text-sm md:text-lg">
                    {{ s.user.firstName }} {{ s.user.lastName }}
                  </h2>
                  <p class="text-sm lowercase md:text-base">
                    asks for
                    <span>{{ s.service.name }}</span>
                  </p>
                </div>
              </div>
              <p
                class="font-title absolute m-auto w-56 -rotate-12 text-center text-lg font-bold text-red-800 opacity-60 md:w-72 md:text-2xl lg:w-96"
                v-if="s.resolved"
              >
                RESOLVED
              </p>
              <div
                class="bg-themeGreen relative flex h-10 w-10 items-center justify-center rounded-full text-white"
              >
                <MessageSquare class="w-5 md:w-8" />
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
          <DetailsBlock
            v-if="result?.requestedServices.length > 0"
            :id="reqServiceId ? reqServiceId : ''"
          />
          <div
            class="flex flex-col items-center justify-center opacity-80"
            v-else
          >
            <NoData class="h-48 w-48 md:h-56 md:w-56" />
            <p class="md:text-md pt-4 text-center text-sm">
              There is no one with breakfast access.
            </p>
          </div>
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
import NoData from '../../assets/svg/NoData.vue'

export default {
  components: {
    RouteHolder,
    AdminNavigation,
    AdminHeader,
    DetailsBlock,
    MessageSquare,
    Frown,
    NoData,
  },
  setup() {
    const details = ref<boolean>(false)
    const skeletons = ref<number>(3)
    const reqServiceId = ref<string>('')
    const { result, loading, error } = useQuery(GET_REQUESTED_SERVICES)
    const checkId = (id: string) => {
      reqServiceId.value = id
    }

    return { details, result, loading, error, skeletons, reqServiceId, checkId }
  },
}
</script>
