<template>
  <div class="bg-themeWhite flex h-full">
    <section class="flex h-full w-full">
      <admin-navigation />
      <div class="w-5/6 p-6">
        <admin-header name="Pricing" />
        <div class="m-6 p-6 lg:flex lg:gap-12">
          <div class="grid gap-1 md:grid-cols-2 md:gap-6">
            <label
              v-for="r of result.prices"
              :key="r.rateId"
              class="mb-1 block text-neutral-500 focus-within:text-neutral-900"
              :for="r.rateName"
            >
              <div class="flex justify-between">
                <span class="mb-2 block first-letter:uppercase">
                  {{ r.rateName }}
                </span>
                <button
                  @click=";[togglePopup(), checkId(r.rateId)]"
                  class="border-themeBrown bg-themeOffWhite text-themeBrown focus:ring-themeBrown hover:bg-themeBrown mb-2 items-center rounded-md border px-2 py-1 text-xs hover:bg-opacity-20 focus:outline-none focus:ring"
                >
                  UPDATE
                </button>
              </div>
              <p class="absolute py-1 pl-3 text-neutral-800">€</p>
              <input
                v-model="r.price"
                :id="r.rateName"
                class="w-full rounded-md border px-6 py-1 text-neutral-800 outline-none focus-visible:ring"
                type="number"
                :name="r.rateName"
                disabled
              />
            </label>
          </div>
        </div>
        <div v-if="showPopup">
          <rate-pop-up :togglePopup="() => togglePopup()" :id="rateId" />
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import RouteHolder from '../../components/holders/RouteHolder.vue'
import AdminNavigation from '../../components/generic/AdminNavigation.vue'
import AdminHeader from '../../components/generic/AdminHeader.vue'
import RatePopUp from '../../components/rates/RatePopUp.vue'
import { Search, X, Loader2 } from 'lucide-vue-next'
import { useQuery, useResult } from '@vue/apollo-composable'
import { GET_PRICES } from '../../graphql/query.pricing'
import { ref, watch } from 'vue'

export default {
  components: {
    RouteHolder,
    AdminNavigation,
    AdminHeader,
    RatePopUp,
    Search,
    X,
    Loader2,
  },
  setup() {
    const { result, loading, error, refetch } = useQuery(GET_PRICES)
    let showPopup = ref<boolean>(false)
    const rateId = ref<string>('')
    const togglePopup = () => {
      showPopup.value = !showPopup.value
    }
    const checkId = (id: string) => {
      rateId.value = id
    }

    watch(showPopup, () => {
      refetch()
      console.log(result)
    })

    return {
      result,
      showPopup,
      rateId,
      togglePopup,
      checkId,
    }
  },
}
</script>
