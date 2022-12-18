<template>
  <div class="grid gap-3">
    <div class="grid sm:grid-cols-[auto_1fr] md:gap-12">
      <img
        v-if="selectedRoom.category == 'luxe'"
        class="max-w-64 mb-6 aspect-square w-full rounded-xl object-cover shadow-md"
        :src="luxe"
        :alt="`picture of a ${selectedRoom.category}-suite`"
      />
      <img
        v-else-if="selectedRoom.category == 'standard'"
        class="max-w-64 mb-6 aspect-square w-full rounded-xl object-cover shadow-md"
        :src="standard"
        :alt="`picture of a ${selectedRoom.category}-suite`"
      />
      <img
        v-else
        class="max-w-64 mb-6 aspect-square w-full rounded-xl object-cover shadow-md"
        :src="standard"
        :alt="`picture of a standard-suite`"
      />
      <div class="flex flex-col gap-1">
        <h2 class="font-theme font-title text-2xl font-bold">
          {{ selectedRoom.name }}
        </h2>
        <ul class="flex gap-1">
          <li v-for="n in selectedRoom.rating">
            <Star class="fill-themeBrown stroke-themeBrown" />
          </li>
          <li
            v-if="selectedRoom.rating < 5"
            v-for="n in 5 - selectedRoom.rating"
          >
            <Star />
          </li>
        </ul>
        <p class="text-sm font-semibold tracking-wide text-neutral-500">
          {{ selectedRoom.description }}
        </p>
        <p class="mt-3 text-sm font-bold text-neutral-700 md:mt-6">
          Total price: €{{ reservationFormInput.price }}
        </p>
      </div>
    </div>
    <h2 class="font-title mb-6 text-2xl font-bold md:text-3xl lg:text-4xl">
      Choose a payment method
    </h2>
    <ul>
      <li class="flex items-center space-x-3">
        <label
          class="border-themeBrown ring-themeBrown relative flex h-5 w-5 items-center justify-center rounded-full border focus-within:ring focus:outline-none"
        >
          <input
            class="peer sr-only"
            type="radio"
            name="paymentOptions"
            id="cash"
            checked
          />
          <span
            class="bg-themeBrown h-2 w-2 scale-0 rounded-full transition ease-out peer-checked:scale-100"
          ></span>
        </label>

        <label class="select-none dark:text-white" for="cash">
          Cash payment
        </label>
      </li>
      <li class="mt-3 flex items-center space-x-3">
        <label
          class="border-themeBrown ring-themeBrown relative flex h-5 w-5 items-center justify-center rounded-full border focus-within:ring focus:outline-none"
        >
          <input
            class="peer sr-only"
            type="radio"
            name="paymentOptions"
            id="credit"
          />
          <span
            class="bg-themeBrown h-2 w-2 scale-0 rounded-full transition ease-out peer-checked:scale-100"
          ></span>
        </label>

        <label class="select-none dark:text-white" for="credit">
          Credit payment
        </label>
      </li>
    </ul>
  </div>

  <div class="flex justify-end gap-3">
    <button
      class="bg-themeOffWhite text-themeBrown border-themeBrown rounded-md border px-4 py-2"
      @click="changeStepTo(2)"
    >
      Previous
    </button>
    <button
      class="bg-themeOffWhite text-themeBrown border-themeBrown rounded-md border px-4 py-2"
      @click="submitForm"
    >
      Submit
    </button>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { useMutation } from '@vue/apollo-composable'
import { Star } from 'lucide-vue-next'

import useFormUpdate from '../../../composables/useFormUpdate'

import luxe from '../../../assets/luxe-suite.webp'
import standard from '../../../assets/standard-suite.webp'

import { ADD_RESERVATION } from '../../../graphql/mutation.reservation'
import { UDATE_ROOM_RESERVATION } from '../../../graphql/mutation.room'
import useSocket from '../../../composables/useSocket'
import { GET_RESERVATIONS_BY_USER_ID } from '../../../graphql/query.reservation'
import useAuthentication from '../../../composables/useAuthentication'

const { user } = useAuthentication()
const errorMessage = ref('')
const {
  reservationFormInput,
  selectedRoom,
  reservationId,
  setReservationId,
  resetReservationForm,
  changeStepTo,
} = useFormUpdate()
const { sendNewReservation } = useSocket()
const ReservationErrors = reactive({
  amountDays: '',
  amountPeople: '',
  room: '',
})

const { mutate: createReservation } = useMutation(ADD_RESERVATION, () => ({
  variables: {
    CreateReservationInput: reservationFormInput,
  },
  update(cache, { data: { createReservation } }) {
    let data: any = cache.readQuery({
      query: GET_RESERVATIONS_BY_USER_ID,
      variables: { uid: user.value?.uid! },
    })
    cache.writeQuery({
      query: GET_RESERVATIONS_BY_USER_ID,
      variables: { uid: user.value?.uid! },
      data: {
        findReservationsByUserId: [
          ...data.findReservationsByUserId,
          createReservation,
        ],
      },
    })
  },
}))

const { mutate: updateRoom } = useMutation(UDATE_ROOM_RESERVATION, () => ({
  variables: {
    id: selectedRoom.id,
    reservationId: reservationId.value,
  },
}))

const IsReservationValid = (): boolean => {
  let hasSomeErrors = false

  if (reservationFormInput.reservationEndDate === '') {
    ReservationErrors.amountDays = 'Please enter the amount of days'
    hasSomeErrors = true
  } else {
    ReservationErrors.amountDays = ''
  }

  if (
    reservationFormInput.amountAdults === 0 &&
    reservationFormInput.amountChildren === 0
  ) {
    ReservationErrors.amountPeople = 'Please enter an amount of people'
    hasSomeErrors = true
  } else {
    ReservationErrors.amountPeople = ''
  }

  if (selectedRoom.id === '') {
    ReservationErrors.room = 'Please select a room'
    hasSomeErrors = true
  } else {
    ReservationErrors.room = ''
  }

  if (hasSomeErrors) return true
  return false
}

const submitForm = async () => {
  if (IsReservationValid()) return

  const reservation = await createReservation().catch((err) => {
    errorMessage.value = err.message
  })

  if (reservation) {
    setReservationId(reservation.data.createReservation.id)

    const room = await updateRoom().catch((err) => {
      errorMessage.value = err.message
    })
    sendNewReservation(reservationFormInput)
    resetReservationForm()
    changeStepTo(4)
  }
}
</script>
