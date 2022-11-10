<template>
  <div class="bg-themeWhite flex h-full">
    <section class="flex h-full w-full">
      <admin-navigation />
      <div class="w-5/6 p-6">
        <admin-header name="Pricing" />
        <div className="p-6 md:flex">
          <form class="m-6" @submit.prevent="submitForm">
            <div
              v-if="errorMessage"
              class="mb-3 flex items-center justify-between rounded-md bg-red-100 px-3 py-1"
            >
              <p class="text-sm text-red-600">{{ errorMessage }}</p>

              <button
                @click="errorMessage = ''"
                class="rounded-full p-3 ring-red-600 hover:bg-red-200 focus:outline-none focus:ring-2"
              >
                <X class="h-4 w-4 text-red-600" />
              </button>
            </div>
            <div class="lg:flex lg:gap-12">
              <div>
                <h2 class="font-title text-themeGreen pb-3 font-bold">
                  Room rates for the week (per night)
                </h2>
                <div class="grid gap-1 md:grid-cols-2 md:gap-6">
                  <label
                    class="mb-1 block text-neutral-500 focus-within:text-neutral-900"
                    :class="
                      priceErrors.child ? 'focus-within:text-red-600' : ''
                    "
                    for="child"
                  >
                    <span
                      class="mb-2 block"
                      :class="priceErrors.child ? 'text-xs text-red-600' : ''"
                    >
                      Child
                      {{ priceErrors.child ? `(${priceErrors.child})` : '' }}
                    </span>
                    <input
                      v-model="priceInput.child"
                      :class="
                        priceErrors.child
                          ? ' border-red-800 ring-red-800'
                          : 'border-themeBrown ring-themeBrown '
                      "
                      id="child"
                      class="w-full rounded-md border px-3 py-1 text-neutral-800 outline-none focus-visible:ring"
                      type="number"
                      name="child"
                    />
                  </label>
                  <label
                    class="mb-1 block text-neutral-500 focus-within:text-neutral-900"
                    :class="
                      priceErrors.adult ? 'focus-within:text-red-600' : ''
                    "
                    for="adult"
                  >
                    <span
                      class="mb-2 block"
                      :class="priceErrors.adult ? 'text-xs text-red-600' : ''"
                    >
                      Adult
                      {{ priceErrors.adult ? `(${priceErrors.adult})` : '' }}
                    </span>
                    <input
                      v-model="priceInput.adult"
                      :class="
                        priceErrors.adult
                          ? ' border-red-800 ring-red-800'
                          : 'border-themeBrown ring-themeBrown '
                      "
                      id="adult"
                      class="w-full rounded-md border px-3 py-1 text-neutral-800 outline-none focus-visible:ring"
                      type="number"
                      name="adult"
                    />
                  </label>
                  <label
                    class="mb-1 block text-neutral-500 focus-within:text-neutral-900"
                    :class="
                      priceErrors.standard ? 'focus-within:text-red-600' : ''
                    "
                    for="standard"
                  >
                    <span
                      class="mb-2 block"
                      :class="
                        priceErrors.standard ? 'text-xs text-red-600' : ''
                      "
                    >
                      Standard room
                      {{
                        priceErrors.standard ? `(${priceErrors.standard})` : ''
                      }}
                    </span>
                    <input
                      v-model="priceInput.standard"
                      :class="
                        priceErrors.standard
                          ? ' border-red-800 ring-red-800'
                          : 'border-themeBrown ring-themeBrown '
                      "
                      id="standard"
                      class="w-full rounded-md border px-3 py-1 text-neutral-800 outline-none focus-visible:ring"
                      type="number"
                      name="standard"
                    />
                  </label>
                  <label
                    class="mb-1 block text-neutral-500 focus-within:text-neutral-900"
                    :class="
                      priceErrors.standard ? 'focus-within:text-red-600' : ''
                    "
                    for="luxe"
                  >
                    <span
                      class="mb-2 block"
                      :class="priceErrors.luxe ? 'text-xs text-red-600' : ''"
                    >
                      Luxe room
                      {{ priceErrors.luxe ? `(${priceErrors.luxe})` : '' }}
                    </span>
                    <input
                      v-model="priceInput.luxe"
                      :class="
                        priceErrors.luxe
                          ? ' border-red-800 ring-red-800'
                          : 'border-themeBrown ring-themeBrown '
                      "
                      id="luxe"
                      class="w-full rounded-md border px-3 py-1 text-neutral-800 outline-none focus-visible:ring"
                      type="number"
                      name="luxe"
                    />
                  </label>
                  <label
                    class="mb-1 block text-neutral-500 focus-within:text-neutral-900"
                    :class="
                      priceErrors.breakfast ? 'focus-within:text-red-600' : ''
                    "
                    for="breakfast"
                  >
                    <span
                      class="mb-2 block"
                      :class="
                        priceErrors.breakfast ? 'text-xs text-red-600' : ''
                      "
                    >
                      Breakfast
                      {{
                        priceErrors.breakfast
                          ? `(${priceErrors.breakfast})`
                          : ''
                      }}
                    </span>
                    <input
                      v-model="priceInput.breakfast"
                      :class="
                        priceErrors.breakfast
                          ? ' border-red-800 ring-red-800'
                          : 'border-themeBrown ring-themeBrown '
                      "
                      id="breakfast"
                      class="w-full rounded-md border px-3 py-1 text-neutral-800 outline-none focus-visible:ring"
                      type="number"
                      name="breakfast"
                    />
                  </label>
                  <label
                    class="mb-1 block text-neutral-500 focus-within:text-neutral-900"
                    :class="
                      priceErrors.night ? 'focus-within:text-red-600' : ''
                    "
                    for="night"
                  >
                    <span
                      class="mb-2 block"
                      :class="priceErrors.night ? 'text-xs text-red-600' : ''"
                    >
                      Basic price
                      {{ priceErrors.night ? `(${priceErrors.night})` : '' }}
                    </span>
                    <input
                      v-model="priceInput.night"
                      :class="
                        priceErrors.night
                          ? ' border-red-800 ring-red-800'
                          : 'border-themeBrown ring-themeBrown '
                      "
                      id="night"
                      class="w-full rounded-md border px-3 py-1 text-neutral-800 outline-none focus-visible:ring"
                      type="number"
                      name="night"
                    />
                  </label>
                </div>
              </div>
              <div class="pt-6 lg:pt-0">
                <h2 class="font-title text-themeGreen pb-3 font-bold">
                  Room rates for the weekend (per night)
                </h2>
                <div class="grid gap-1 md:grid-cols-2 md:gap-6">
                  <label
                    class="mb-1 block text-neutral-500 focus-within:text-neutral-900"
                    :class="
                      priceErrors.childWeekend
                        ? 'focus-within:text-red-600'
                        : ''
                    "
                    for="childWeekend"
                  >
                    <span
                      class="mb-2 block"
                      :class="
                        priceErrors.childWeekend ? 'text-xs text-red-600' : ''
                      "
                    >
                      Child
                      {{
                        priceErrors.childWeekend
                          ? `(${priceErrors.childWeekend})`
                          : ''
                      }}
                    </span>
                    <input
                      v-model="priceInput.childWeekend"
                      :class="
                        priceErrors.childWeekend
                          ? ' border-red-800 ring-red-800'
                          : 'border-themeBrown ring-themeBrown '
                      "
                      id="childWeekend"
                      class="w-full rounded-md border px-3 py-1 text-neutral-800 outline-none focus-visible:ring"
                      type="number"
                      name="childWeekend"
                    />
                  </label>
                  <label
                    class="mb-1 block text-neutral-500 focus-within:text-neutral-900"
                    :class="
                      priceErrors.adultWeekend
                        ? 'focus-within:text-red-600'
                        : ''
                    "
                    for="adultWeekend"
                  >
                    <span
                      class="mb-2 block"
                      :class="
                        priceErrors.adultWeekend ? 'text-xs text-red-600' : ''
                      "
                    >
                      Adult
                      {{
                        priceErrors.adultWeekend
                          ? `(${priceErrors.adultWeekend})`
                          : ''
                      }}
                    </span>
                    <input
                      v-model="priceInput.adultWeekend"
                      :class="
                        priceErrors.adultWeekend
                          ? ' border-red-800 ring-red-800'
                          : 'border-themeBrown ring-themeBrown '
                      "
                      id="adultWeekend"
                      class="w-full rounded-md border px-3 py-1 text-neutral-800 outline-none focus-visible:ring"
                      type="number"
                      name="adultWeekend"
                    />
                  </label>
                  <label
                    class="mb-1 block text-neutral-500 focus-within:text-neutral-900"
                    :class="
                      priceErrors.standardWeekend
                        ? 'focus-within:text-red-600'
                        : ''
                    "
                    for="standardWeekend"
                  >
                    <span
                      class="mb-2 block"
                      :class="
                        priceErrors.standardWeekend
                          ? 'text-xs text-red-600'
                          : ''
                      "
                    >
                      Standard room
                      {{
                        priceErrors.standardWeekend
                          ? `(${priceErrors.standardWeekend})`
                          : ''
                      }}
                    </span>
                    <input
                      v-model="priceInput.standardWeekend"
                      :class="
                        priceErrors.standardWeekend
                          ? ' border-red-800 ring-red-800'
                          : 'border-themeBrown ring-themeBrown '
                      "
                      id="standardWeekend"
                      class="w-full rounded-md border px-3 py-1 text-neutral-800 outline-none focus-visible:ring"
                      type="number"
                      name="standardWeekend"
                    />
                  </label>
                  <label
                    class="mb-1 block text-neutral-500 focus-within:text-neutral-900"
                    :class="
                      priceErrors.standardWeekend
                        ? 'focus-within:text-red-600'
                        : ''
                    "
                    for="luxeWeekend"
                  >
                    <span
                      class="mb-2 block"
                      :class="
                        priceErrors.luxeWeekend ? 'text-xs text-red-600' : ''
                      "
                    >
                      Luxe room
                      {{
                        priceErrors.luxeWeekend
                          ? `(${priceErrors.luxeWeekend})`
                          : ''
                      }}
                    </span>
                    <input
                      v-model="priceInput.luxeWeekend"
                      :class="
                        priceErrors.luxeWeekend
                          ? ' border-red-800 ring-red-800'
                          : 'border-themeBrown ring-themeBrown '
                      "
                      id="luxeWeekend"
                      class="w-full rounded-md border px-3 py-1 text-neutral-800 outline-none focus-visible:ring"
                      type="number"
                      name="luxeWeekend"
                    />
                  </label>
                  <label
                    class="mb-1 block text-neutral-500 focus-within:text-neutral-900"
                    :class="
                      priceErrors.breakfastWeekend
                        ? 'focus-within:text-red-600'
                        : ''
                    "
                    for="breakfastWeekend"
                  >
                    <span
                      class="mb-2 block"
                      :class="
                        priceErrors.breakfastWeekend
                          ? 'text-xs text-red-600'
                          : ''
                      "
                    >
                      Breakfast
                      {{
                        priceErrors.breakfastWeekend
                          ? `(${priceErrors.breakfastWeekend})`
                          : ''
                      }}
                    </span>
                    <input
                      v-model="priceInput.breakfastWeekend"
                      :class="
                        priceErrors.breakfastWeekend
                          ? ' border-red-800 ring-red-800'
                          : 'border-themeBrown ring-themeBrown '
                      "
                      id="breakfastWeekend"
                      class="w-full rounded-md border px-3 py-1 text-neutral-800 outline-none focus-visible:ring"
                      type="number"
                      name="breakfastWeekend"
                    />
                  </label>
                  <label
                    class="mb-1 block text-neutral-500 focus-within:text-neutral-900"
                    :class="
                      priceErrors.nightWeekend
                        ? 'focus-within:text-red-600'
                        : ''
                    "
                    for="nightWeekend"
                  >
                    <span
                      class="mb-2 block"
                      :class="
                        priceErrors.nightWeekend ? 'text-xs text-red-600' : ''
                      "
                    >
                      Basic price
                      {{
                        priceErrors.nightWeekend
                          ? `(${priceErrors.nightWeekend})`
                          : ''
                      }}
                    </span>
                    <input
                      v-model="priceInput.nightWeekend"
                      :class="
                        priceErrors.nightWeekend
                          ? ' border-red-800 ring-red-800'
                          : 'border-themeBrown ring-themeBrown '
                      "
                      id="nightWeekend"
                      class="w-full rounded-md border px-3 py-1 text-neutral-800 outline-none focus-visible:ring"
                      type="number"
                      name="nightWeekend"
                    />
                  </label>
                </div>
              </div>
            </div>
            <button
              class="border-themeBrown bg-themeOffWhite text-themeBrown focus:ring-themeBrown hover:bg-themeBrown mt-6 flex items-center rounded-md border px-6 py-2 text-sm hover:bg-opacity-20 focus:outline-none focus:ring"
              :disabled="load"
            >
              <div class="flex" v-if="!load">CONFIRM</div>
              <div v-else>
                <Loader2 class="animate-spin" />
              </div>
            </button>
            <p class="pt-3 text-green-700 lg:text-lg">{{ successMessage }}</p>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import RouteHolder from '../../components/holders/RouteHolder.vue'
import AdminNavigation from '../../components/generic/AdminNavigation.vue'
import AdminHeader from '../../components/generic/AdminHeader.vue'
import { Search, X, Loader2 } from 'lucide-vue-next'
import { reactive, ref, watch } from 'vue'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { PRICE_BY_RESTIME, GET_PRICES } from '../../graphql/query.pricing'
import { UPDATE_PRICES } from '../../graphql/mutation.pricing'

export default {
  components: {
    RouteHolder,
    AdminNavigation,
    AdminHeader,
    Search,
    X,
    Loader2,
  },
  setup() {
    const errorMessage = ref<string>('')
    const successMessage = ref<string>('')
    const load = ref<boolean>(false)
    const { result, loading, error } = useQuery(GET_PRICES)

    const priceErrors = reactive({
      child: '',
      adult: '',
      night: '',
      standard: '',
      luxe: '',
      breakfast: '',
      childWeekend: '',
      adultWeekend: '',
      nightWeekend: '',
      standardWeekend: '',
      luxeWeekend: '',
      breakfastWeekend: '',
    })

    const priceInput = reactive({
      id: '',
      child: 0,
      adult: 0,
      night: 0,
      standard: 0,
      luxe: 0,
      breakfast: 0,
      childWeekend: 0,
      adultWeekend: 0,
      nightWeekend: 0,
      standardWeekend: 0,
      luxeWeekend: 0,
      breakfastWeekend: 0,
    })

    const { mutate: updatePrices } = useMutation(UPDATE_PRICES, () => ({
      variables: {
        updatePricingInput: priceInput,
      },
    }))

    watch(result, () => {
      const prices = result.value?.prices[0]
      priceInput.id = prices.id
      priceInput.child = prices.child
      priceInput.adult = prices.adult
      priceInput.night = prices.night
      priceInput.standard = prices.standard
      priceInput.luxe = prices.luxe
      priceInput.breakfast = prices.breakfast

      priceInput.childWeekend = prices.childWeekend
      priceInput.adultWeekend = prices.adultWeekend
      priceInput.nightWeekend = prices.nightWeekend
      priceInput.standardWeekend = prices.standardWeekend
      priceInput.luxeWeekend = prices.luxeWeekend
      priceInput.breakfastWeekend = prices.breakfastWeekend
    })

    const isFormInvalid = (): boolean => {
      let hasErrors: boolean = false
      if (priceInput.child < 0) {
        priceErrors.child = 'Price cannot be less than 0'
        hasErrors = true
      } else {
        priceErrors.child = ''
      }

      if (priceInput.childWeekend < 0) {
        priceErrors.childWeekend = 'Price cannot be less than 0'
        hasErrors = true
      } else {
        priceErrors.childWeekend = ''
      }

      if (priceInput.adult < 0) {
        priceErrors.adult = 'Price cannot be less than 0'
        hasErrors = true
      } else {
        priceErrors.adult = ''
      }

      if (priceInput.adultWeekend < 0) {
        priceErrors.adultWeekend = 'Price cannot be less than 0'
        hasErrors = true
      } else {
        priceErrors.adultWeekend = ''
      }

      if (priceInput.standard < 0) {
        priceErrors.standard = 'Price cannot be less than 0'
        hasErrors = true
      } else {
        priceErrors.standard = ''
      }

      if (priceInput.standardWeekend < 0) {
        priceErrors.standardWeekend = 'Price cannot be less than 0'
        hasErrors = true
      } else {
        priceErrors.standardWeekend = ''
      }

      if (priceInput.luxe < 0) {
        priceErrors.luxe = 'Price cannot be less than 0'
        hasErrors = true
      } else {
        priceErrors.luxe = ''
      }

      if (priceInput.luxeWeekend < 0) {
        priceErrors.luxeWeekend = 'Price cannot be less than 0'
        hasErrors = true
      } else {
        priceErrors.luxeWeekend = ''
      }

      if (priceInput.night < 0) {
        priceErrors.night = 'Price cannot be less than 0'
        hasErrors = true
      } else {
        priceErrors.night = ''
      }

      if (priceInput.nightWeekend < 0) {
        priceErrors.nightWeekend = 'Price cannot be less than 0'
        hasErrors = true
      } else {
        priceErrors.nightWeekend = ''
      }

      if (priceInput.breakfast < 0) {
        priceErrors.breakfast = 'Price cannot be less than 0'
        hasErrors = true
      } else {
        priceErrors.breakfast = ''
      }

      if (priceInput.breakfastWeekend < 0) {
        priceErrors.breakfastWeekend = 'Price cannot be less than 0'
        hasErrors = true
      } else {
        priceErrors.breakfastWeekend = ''
      }

      if (hasErrors) return true
      return false
    }

    const submitForm = async () => {
      if (isFormInvalid()) return
      load.value = true
      await updatePrices()
        .catch((err) => {
          console.log({ err })

          errorMessage.value = err.message
        })
        .finally(() => {
          load.value = false
          //todo
          successMessage.value = 'Prices successfully updated'
        })
    }

    return {
      errorMessage,
      successMessage,
      priceErrors,
      priceInput,
      load,
      submitForm,
    }
  },
}
</script>
