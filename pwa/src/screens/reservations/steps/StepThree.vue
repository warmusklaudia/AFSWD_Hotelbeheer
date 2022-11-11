<template>
    <div class="grid gap-3">
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
                <p class="text-sm font-bold  text-neutral-700 mt-3 md:mt-6">Total price: €{{ reservationFormInput.price
                }}
                </p>
            </div>
        </div>
        <h2 class="font-title font-bold text-2xl md:text-3xl lg:text-4xl mb-6">Choose a payment method</h2>
        <ul>
            <li class="flex items-center space-x-3">
                <label
                    class="flex h-5 w-5 items-center relative justify-center rounded-full border border-themeBrown ring-themeBrown focus-within:ring focus:outline-none">
                    <input class="peer sr-only" type="radio" name="paymentOptions" id="cash" checked />
                    <span
                        class="transition w-2 h-2 bg-themeBrown rounded-full scale-0 ease-out peer-checked:scale-100"></span>
                </label>

                <label class="select-none dark:text-white" for="cash">
                    Cash payment
                </label>
            </li>
            <li class="flex items-center space-x-3 mt-3">
                <label
                    class="flex h-5 w-5 items-center relative justify-center rounded-full border border-themeBrown ring-themeBrown focus-within:ring focus:outline-none">
                    <input class="peer sr-only" type="radio" name="paymentOptions" id="credit" />
                    <span
                        class="w-2 h-2 bg-themeBrown rounded-full transition scale-0 ease-out peer-checked:scale-100"></span>
                </label>

                <label class="select-none dark:text-white" for="credit">
                    Credit payment
                </label>
            </li>
        </ul>
    </div>

    <div class="flex justify-end gap-3">
        <button class="rounded-md bg-themeOffWhite px-4 py-2 text-themeBrown border border-themeBrown"
            @click="changeStepTo(2)">Previous</button>
        <button class="rounded-md bg-themeOffWhite px-4 py-2 text-themeBrown border border-themeBrown"
            @click="submitForm">Submit</button>
    </div>

</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { Star } from "lucide-vue-next";

import useFormUpdate from "../../../composables/useFormUpdate";

import luxe from '../../../assets/luxe-suite.webp'
import standard from '../../../assets/standard-suite.webp'

import { ADD_RESERVATION } from "../../../graphql/mutation.reservation";
import { UPDATE_ROOM } from "../../../graphql/mutation.room";

const errorMessage = ref('')
const { reservationFormInput, selectedRoom, reservationId, setReservationId, resetReservationForm, changeStepTo } = useFormUpdate()
const ReservationErrors = reactive({
    amountDays: '',
    amountPeople: '',
    room: '',
})

const { mutate: addReservation } = useMutation(ADD_RESERVATION, () => ({
    variables: {
        CreateReservationInput: reservationFormInput,
    },
}))

const { mutate: updateRoom } = useMutation(UPDATE_ROOM, () => ({
    variables: {
        UpdateRoomInput: { id: selectedRoom.id, reservationId: reservationId.value },
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

    if (reservationFormInput.amountAdults === 0 && reservationFormInput.amountChildren === 0) {
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

    const reservation = await addReservation().catch((err) => {
        errorMessage.value = err.message
    })

    if (reservation) {
        setReservationId(reservation.data.createReservation.id)

        const room = await updateRoom().catch((err) => {
            errorMessage.value = err.message
        })

        resetReservationForm()
        changeStepTo(4)
    }
}
</script>