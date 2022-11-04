<template>
  <div>
    <div class="grid sm:grid-cols-[auto_1fr] md:gap-12">
      <img v-if="selectedRoom.category == 'luxe'"
        class="mb-6 aspect-square w-full object-cover rounded-xl shadow-md max-w-64" :src="luxe"
        :alt="`picture of a ${selectedRoom.category}-suite`" />
      <img v-else-if="selectedRoom.category == 'standard'"
        class="mb-6 aspect-square w-full object-cover rounded-xl shadow-md max-w-64" :src="standard"
        :alt="`picture of a ${selectedRoom.category}-suite`" />
      <img v-else class="mb-6 aspect-square w-full object-cover rounded-xl shadow-md max-w-64" :src="standard"
        :alt="`picture of a standard-suite`" />
      <div class="flex flex-col gap-1">
        <h2 class="font-theme font-title text-2xl font-bold">{{ selectedRoom.name }}</h2>
        <ul class="flex gap-1">
          <li v-for="n in selectedRoom.rating">
            <Star class="fill-themeBrown stroke-themeBrown" />
          </li>
          <li v-if="selectedRoom.rating < 5" v-for="n in 5 - selectedRoom.rating">
            <Star />
          </li>
        </ul>
        <p class="text-sm font-semibold tracking-wide text-neutral-500">{{ selectedRoom.description }}</p>
      </div>
    </div>

    <div class="grid md:grid-cols-3 gap-6 md:gap-x-12 mt-6">
      <label class="mb-1 block text-neutral-500 focus-within:text-neutral-900" for="amountChildren">
        <span class="font-title mb-2 block">
          First Name
        </span>
        <input id="amountChildren"
          class="ring-themeBrown w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none focus-visible:ring"
          type="text" name="amountChildren" />
      </label>
      <label class="mb-1 block text-neutral-500 focus-within:text-neutral-900" for="amountChildren">
        <span class="font-title mb-2 block">
          Last name
        </span>
        <input id="amountChildren"
          class="ring-themeBrown w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none focus-visible:ring"
          type="text" name="amountChildren" />
      </label>
      <label class="mb-1 block text-neutral-500 focus-within:text-neutral-900" for="amountChildren">
        <span class="font-title mb-2 block">
          Email address
        </span>
        <input id="amountChildren"
          class="ring-themeBrown w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none focus-visible:ring"
          type="email" name="amountChildren" />
      </label>

      <div class="mt-3 flex items-center space-x-3">
        <label
          class="flex h-5 w-5 items-center justify-center rounded-md border border-neutral-300 focus-within:border-themeBrown ring-blue-200 focus-within:ring focus:outline-none"
          for="breakfast">
          <input class="peer sr-only" type="checkbox" name="breakfast" id="breakfast" @input="setBreakfast"
            :checked="addBreakfast" />
          <Check class="transition h-4 scale-0 dark:text-white text-themeBrown ease-out peer-checked:scale-100" />
        </label>
        <label class="select-none dark:text-white font-text" for="breakfast">
          Add breakfast (+ €120)
        </label>
      </div>

    </div>
  </div>
  <div class="flex justify-end gap-3 ">
    <button class="rounded-md bg-themeOffWhite px-4 py-2 text-themeBrown border border-themeBrown"
      @click="changeStepTo(1)">Previous</button>
    <button class="rounded-md bg-themeOffWhite px-4 py-2 text-themeBrown border border-themeBrown"
      @click="nextStep">Next</button>
  </div>

</template>
<script setup lang="ts">
import { reactive } from "vue";
import { Star, Check } from "lucide-vue-next";

import useFormUpdate from '../../../composables/useFormUpdate'

import luxe from '../../../assets/luxe-suite.webp'
import standard from '../../../assets/standard-suite.webp'

const { reservationFormInput, selectedRoom, addBreakfast, amountDays, setBreakfast, setPrice, changeStepTo } = useFormUpdate()

const stepTwoErrors = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
})

const nextStep = () => {
  const childPrice = reservationFormInput.amountChildren * 100
  const adultPrice = reservationFormInput.amountAdults * 150
  const daysPrice = amountDays.value * 50
  const categoryPrice = selectedRoom.category === 'luxe' ? 500 : 300
  const breakfastPrice = addBreakfast.value ? 120 : 0

  const totalPrice = categoryPrice + childPrice + adultPrice + breakfastPrice + daysPrice
  setPrice(totalPrice)

  changeStepTo(3)
}

</script>
