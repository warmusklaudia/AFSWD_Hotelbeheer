<template>
  <div>
    <div
      class="fixed top-0 left-0 z-20 h-full w-full bg-neutral-900 bg-opacity-25"
      @click="togglePopup()"
    ></div>
    <div
      class="fixed top-1/2 left-1/2 z-30 h-96 w-2/3 -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white pt-6 text-lg shadow-lg md:h-96 md:w-2/5"
    >
      <div class="text-themeGreen mx-6 h-3/4 text-center">
        <button
          @click="togglePopup()"
          class="border-themeGreen float-right flex h-8 w-8 items-center justify-center self-end rounded-full border"
        >
          <X />
        </button>
        <h2 class="font-title self-center text-2xl font-bold">
          Rate <span class="text-xl">{{ result?.price.rateId }}</span>
        </h2>
        <form
          class="mt-6 flex h-full flex-col justify-between"
          @submit.prevent="submitForm"
        >
          <label
            class="mb-1 block text-neutral-500 focus-within:text-neutral-900"
            :class="priceErrors.price ? 'focus-within:text-red-600' : ''"
            :for="result?.price.rateName"
          >
            <span
              class="mb-2 block first-letter:uppercase"
              :class="priceErrors.price ? ' text-red-600' : ''"
            >
              {{ result?.price.rateName }}
              {{ priceErrors.price ? `(${priceErrors.price})` : '' }}
            </span>
            <input
              v-model="priceInput.price"
              :class="
                priceErrors.price
                  ? ' border-red-800 ring-red-800'
                  : 'border-themeBrown ring-themeBrown '
              "
              :id="result?.price.rateName"
              class="w-full rounded-md border px-3 py-1 text-neutral-800 outline-none focus-visible:ring lg:w-1/2"
              type="number"
              :name="result?.price.rateName"
            />
          </label>
          <p class="pt-3 text-green-700 lg:text-lg">
            {{ errorMessage == '' ? successMessage : '' }}
          </p>
          <p class="pt-3 text-red-700 lg:text-lg">
            {{ errorMessage !== '' ? errorMessage : '' }}
          </p>
          <button
            class="border-themeBrown bg-themeOffWhite text-themeBrown focus:ring-themeBrown hover:bg-themeBrown m-auto mb-6 flex items-center rounded-md border px-6 py-2 text-sm hover:bg-opacity-20 focus:outline-none focus:ring"
            :disabled="load"
          >
            <div class="flex" v-if="!load">CONFIRM</div>
            <div v-else>
              <Loader2 class="animate-spin" />
            </div>
          </button>
        </form>
      </div>
    </div>
  </div>
  <div
    class="bg-themeBrown fixed top-1/2 left-1/2 z-20 m-2 h-96 w-2/3 -translate-x-1/2 -translate-y-1/2 transform rounded-lg pt-6 text-lg shadow-lg md:h-96 md:w-2/5"
  ></div>
</template>

<script lang="ts">
import { useMutation, useQuery } from '@vue/apollo-composable'
import { Check, X, Loader2 } from 'lucide-vue-next'
import { useRoute } from 'vue-router'
import { Rate } from '../../interfaces/interface.rate'
import { GET_PRICES, PRICE_BY_ID } from '../../graphql/query.pricing'
import { reactive, ref, watch } from 'vue'
import { UPDATE_PRICES } from '../../graphql/mutation.pricing'
export default {
  components: {
    Check,
    X,
    Loader2,
  },
  props: {
    togglePopup: {
      type: Function,
      required: true,
    },
    id: {
      type: String as () => string,
      required: true,
    },
  },
  setup(props) {
    const load = ref<boolean>(false)
    const errorMessage = ref<string>('')
    const successMessage = ref<string>('')

    const { result, loading, error, refetch } = useQuery<{ price: Rate }>(
      PRICE_BY_ID,
      {
        id: props.id,
      },
    )

    watch(result, () => {
      refetch()
    })

    const { mutate: updatePrices } = useMutation(UPDATE_PRICES, () => ({
      variables: {
        updatePricingInput: priceInput,
      },
    }))

    const priceErrors = reactive({
      price: '',
    })

    const priceInput = reactive({
      rateId: '',
      rateName: '',
      price: 0,
    })

    watch(result, () => {
      priceInput.rateId = result.value!.price.rateId
      priceInput.rateName = result.value!.price.rateName
      priceInput.price = result.value!.price.price
    })

    const isFormInvalid = (): boolean => {
      let hasErrors: boolean = false
      if (priceInput.price < 0) {
        priceErrors.price = 'Price cannot be less than 0'
        hasErrors = true
      } else {
        priceErrors.price = ''
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
          successMessage.value = 'Price successfully updated'
        })
    }

    return {
      successMessage,
      errorMessage,
      load,
      priceErrors,
      priceInput,
      result,
      submitForm,
    }
  },
}
</script>
