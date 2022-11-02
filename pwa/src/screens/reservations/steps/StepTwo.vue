<template>
  <section class="mt-12">
    <div v-if="loading">
      <p>Loading...</p>
    </div>
    <div v-else-if="error">
      <p>Error happend.</p>
    </div>
    <div v-else-if="result" class="grid sm:grid-cols-[1fr_2fr_2fr] md:gap-12">
      <img v-if="result.room.category == 'luxe'"
        class="mb-6 aspect-square w-full object-cover rounded-xl shadow-md max-w-64" :src="luxe"
        :alt="`picture of a ${result.room.category}-suite`" />
      <img v-else-if="result.room.category == 'standard'"
        class="mb-6 aspect-square w-full object-cover rounded-xl shadow-md max-w-64" :src="standard"
        :alt="`picture of a ${result.room.category}-suite`" />
      <img v-else class="mb-6 aspect-square w-full object-cover rounded-xl shadow-md max-w-64" :src="standard"
        :alt="`picture of a standard-suite`" />
      <div class="flex flex-col gap-1">
        <h2 class="font-theme font-title text-2xl font-bold">{{ result.room.name }}</h2>
        <ul class="flex gap-1">
          <li v-for="n in result.room.rating">
            <Star class="fill-themeBrown stroke-themeBrown" />
          </li>
          <li v-if="result.room.rating < 5" v-for="n in 5 - result.room.rating">
            <Star />
          </li>
        </ul>
        <p class="text-sm font-semibold tracking-wide text-neutral-500">{{ result.room.description }}</p>
      </div>
    </div>

    <div class="grid md:grid-cols-3 gap-6 md:gap-12 mt-6">
      <label class="mb-1 block text-neutral-500 focus-within:text-neutral-900" for="amountChildren">
        <span class="font-title mb-2 block">
          First Name
        </span>
        <input id="amountChildren"
          class="ring-themeBrown w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none focus-visible:ring"
          type="number" name="amountChildren" />
      </label>
      <label class="mb-1 block text-neutral-500 focus-within:text-neutral-900" for="amountChildren">
        <span class="font-title mb-2 block">
          Last name
        </span>
        <input id="amountChildren"
          class="ring-themeBrown w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none focus-visible:ring"
          type="number" name="amountChildren" />
      </label>
      <label class="mb-1 block text-neutral-500 focus-within:text-neutral-900" for="amountChildren">
        <span class="font-title mb-2 block">
          Email address
        </span>
        <input id="amountChildren"
          class="ring-themeBrown w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none focus-visible:ring"
          type="number" name="amountChildren" />
      </label>

      <div class="mt-3 flex items-center space-x-3">
        <label
          class="flex h-5 w-5 items-center justify-center rounded-md border border-neutral-300 focus-within:border-themeBrown ring-blue-200 focus-within:ring focus:outline-none"
          for="breakfast">
          <input class="peer sr-only" type="checkbox" name="breakfast" id="breakfast" @input="setBreakfast"
            :value="reservationFormInput.breakfast" />
          <Check class="transition h-4 scale-0 dark:text-white text-themeBrown ease-out peer-checked:scale-100" />
        </label>
        <label class="select-none dark:text-white font-text" for="breakfast">
          Add breakfast (+ €120)
        </label>
      </div>

    </div>
    <div class="flex justify-end gap-3">
      <button class="rounded-md bg-themeOffWhite px-4 py-2 text-themeBrown border border-themeBrown"
        @click="changeStepTo(1)">Previous</button>
      <button class="rounded-md bg-themeOffWhite px-4 py-2 text-themeBrown border border-themeBrown"
        @click="changeStepTo(3)">Next</button>
    </div>
  </section>
</template>
<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { reactive } from "vue";
import { Star, Check } from "lucide-vue-next";
import { useRouter } from "vue-router";

import useFormUpdate from '../../../composables/useFormUpdate'
import { GET_ROOM_By_ID } from '../../../graphql/query.room'

import luxe from '../../../assets/luxe-suite.webp'
import standard from '../../../assets/standard-suite.webp'


const { reservationFormInput, setBreakfast, changeStepTo } = useFormUpdate()
const { push } = useRouter()

const stepTwoErrors = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
})

const { result, loading, error } = useQuery(GET_ROOM_By_ID, {
  id: reservationFormInput.room,
})

//kan in formupdate een functie zijn die step als parameter neemt
const nextStep = () => {
  console.log(reservationFormInput)
  push('/reservations/add/3')
}

</script>
