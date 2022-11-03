<template>
  <section class="grid grid-cols-1 gap-2 md:grid-cols-3">
    <label class="mb-1 block text-neutral-500 focus-within:text-neutral-900" for="reservationStartDate">
      <span class="font-title mb-2 block">Start date</span>
      <input id="reservationStartDate"
        class="ring-themeBrown w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none focus-visible:ring"
        type="date" name="reservationStartDate" v-model="reservationFormInput.reservationStartDate"
        :min="new Date().toISOString().slice(0, 10)" />
    </label>
    <!-- <label
      class="mb-1 block text-neutral-500 focus-within:text-neutral-900"
      for="reservationEndDate"
    >
      <span class="font-title mb-2 block">End date</span>
      <input
        id="reservationEndDate"
        class="ring-themeBrown w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none focus-visible:ring"
        type="date"
        name="reservationEndDate"
        v-model="reservationInput.reservationEndDate"
        :min="reservationInput.reservationStartDate!"
      />
    </label> -->
    <div>
      <label class="mb-1 block text-neutral-500 focus-within:text-neutral-900"
        :class="stepOneErrors.amountDays ? 'focus-within:text-red-600' : ''" for="amountDays">
        <span class="font-title mb-2 block" :class="stepOneErrors.amountDays ? 'text-red-600' : ''">
          Amount Days
        </span>
        <input id="amountDays"
          class="ring-themeBrown w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none focus-visible:ring"
          :class="stepOneErrors.amountDays ? 'border-red-500 text-red-600 ring-red-400' : ''" type="number"
          name="amountDays" min="1" @input="setEndDate" />
      </label>
      <div v-if="stepOneErrors.amountDays != ''"
        class="text-red-600 bg-red-100 border-1 border-red-600 rounded-sm text-sm px-2 py-1 mt-2 flex items-center gap-2">
        <AlertTriangle />
        <p>{{ stepOneErrors.amountDays }}</p>
      </div>
    </div>

    <div>
      <div class="grid grid-cols-2 gap-2">
        <label class="mb-1 block text-neutral-500 focus-within:text-neutral-900"
          :class="stepOneErrors.amountPeople ? 'focus-within:text-red-600' : ''" for="amountAdults">
          <span class="font-title mb-2 block" :class="stepOneErrors.amountPeople ? 'text-red-600' : ''">
            Amount Adults
          </span>
          <input id="amountAdults"
            class="ring-themeBrown w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none focus-visible:ring"
            :class="stepOneErrors.amountPeople ? 'border-red-500 text-red-600 ring-red-400' : ''" type="number"
            name="amountAdults" @input="setAmountAdults" min="0" :value="reservationFormInput.amountAdults" />
        </label>
        <label class="mb-1 block text-neutral-500 focus-within:text-neutral-900"
          :class="stepOneErrors.amountPeople ? 'focus-within:text-red-600' : ''" for="amountChildren">
          <span class="font-title mb-2 block" :class="stepOneErrors.amountPeople ? 'text-red-600' : ''">
            Amount children
          </span>
          <input id="amountChildren"
            class="ring-themeBrown w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none focus-visible:ring"
            :class="stepOneErrors.amountPeople ? 'border-red-500 text-red-600 ring-red-400' : ''" type="number"
            name="amountChildren" @input="setAmountChildren" min="0" :value="reservationFormInput.amountChildren" />
        </label>
      </div>
      <div v-if="stepOneErrors.amountPeople != ''"
        class="text-red-600 bg-red-100 border-1 border-red-600 rounded-sm text-sm px-2 py-1 mt-1 flex items-center gap-2">
        <AlertTriangle />
        <p>{{ stepOneErrors.amountPeople }}</p>
      </div>
    </div>

  </section>
  <section class="py-3">
    <div class="mb-3 md:mb-6">
      <h2 class="font-title font-bold text-2xl md:text-3xl lg:text-4xl"
        :class="stepOneErrors.room ? 'text-red-600' : ''">
        Choose a room
      </h2>
      <div v-if="stepOneErrors.room != ''"
        class="text-red-600 bg-red-100 border-1 border-red-600 rounded-sm text-sm px-2 py-1 mt-1 flex items-center gap-2 md:w-2/4	">
        <AlertTriangle />
        <p>{{ stepOneErrors.room ? stepOneErrors.room : '' }}</p>
      </div>
    </div>

    <div class=" grid animate-pulse gap-12 sm:grid-cols-2 md:grid-cols-3" v-if="loading">
      <div v-for="i of skeletons" :key="i">
        <div class="@dark:bg-neutral-700 aspect-square rounded-md bg-neutral-300"></div>
        <p class="@dark:bg-neutral-600 my-1 h-6 w-24 rounded bg-neutral-200"></p>
        <p class="@dark:bg-neutral-600 my-2 h-6 w-12 rounded bg-neutral-100"></p>
      </div>
    </div>
    <div v-else-if="error">
      <p>Error happened.</p>
    </div>
    <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3" v-else-if="result">
      <div v-for="r of result.rooms" :key="r.id" @click="setRoom(r.id), setSelectedRoom(r)"
        class="cursor-pointer rounded hover:bg-neutral-200 hover:shadow-lg"
        :class="r.id == reservationFormInput.room ? 'bg-neutral-200' : ''">
        <img v-if="r.category == 'luxe'" class="aspect-video w-full object-cover" :src="luxe"
          :alt="`picture of a ${r.category}-suite`" />
        <img v-else-if="r.category == 'standard'" class="aspect-video w-full object-cover" :src="standard"
          :alt="`picture of a ${r.category}-suite`" />
        <img v-else class="aspect-video w-full object-cover" :src="standard" :alt="`picture of a standard-suite`" />
        <div class="py-6 px-4">
          <h2 class="font-theme font-title text-2xl font-bold">{{ r.name }}</h2>
          <p class="line-clamp-3 text-sm font-semibold tracking-wide text-neutral-700">
            {{ r.description }}
          </p>
        </div>
      </div>
    </div>
    <div class="flex justify-end">
      <button class="rounded-md bg-themeOffWhite px-4 py-2 text-themeBrown border border-themeBrown"
        @click="nextStep">Next</button>
    </div>
  </section>
</template>
<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { reactive, ref } from 'vue'
import { AlertTriangle } from "lucide-vue-next"

import { GET_ROOMS } from '../../../graphql/query.room'
import useFormUpdate from '../../../composables/useFormUpdate'

import luxe from '../../../assets/luxe-suite.webp'
import standard from '../../../assets/standard-suite.webp'

const { result, loading, error } = useQuery(GET_ROOMS)
const skeletons = ref(18)

const { reservationFormInput,selectedRoom, setEndDate, setRoom, setSelectedRoom, setAmountAdults, setAmountChildren, changeStepTo } = useFormUpdate()

const stepOneErrors = reactive({
  amountDays: '',
  amountPeople: '',
  room: '',
})

const isStepOneValid = (): boolean => {
  let hasSomeErrors = false

  if (reservationFormInput.reservationEndDate === '') {
    stepOneErrors.amountDays = 'Please enter the amount of days'
    hasSomeErrors = true
  } else {
    stepOneErrors.amountDays = ''
  }

  if (reservationFormInput.amountAdults === 0 && reservationFormInput.amountChildren === 0) {
    stepOneErrors.amountPeople = 'Please enter an amount of people'
    hasSomeErrors = true
  } else {
    stepOneErrors.amountPeople = ''
  }

  if (selectedRoom.id === '') {
    stepOneErrors.room = 'Please select a room'
    hasSomeErrors = true
  } else {
    stepOneErrors.room = ''
  }

  if (hasSomeErrors) return true
  return false
}

const nextStep = () => {
  if (isStepOneValid()) return

  changeStepTo(2)
}

</script>
