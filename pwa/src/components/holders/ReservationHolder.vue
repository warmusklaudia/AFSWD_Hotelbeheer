<template>
    <form @submit.prevent="">
        <ReservationNavigation />
        <RouterView />
        <!-- <ul
            class="grid w-full font-title font-bold grid-cols-4 items-center text-center text-xs sm:w-auto sm:space-x-3 sm:text-left sm:text-sm mb-6">
            <li>
                <div class=" inline-block rounded-sm px-3 py-3 outline-none focus-visible:ring-2"
                    :class="setActiveClass(1)">
                    <p>Date & Room</p>
                </div>
            </li>
            <li>
                <div class=" inline-block rounded-sm px-3 py-3 outline-none focus-visible:ring-2"
                    :class="setActiveClass(2)">
                    <p>Personal info</p>
                </div>
            </li>
            <li>
                <div class="inline-block rounded-sm px-3 py-3 outline-none focus-visible:ring-2"
                    :class="setActiveClass(3)">
                    <p>Payment</p>
                </div>
            </li>
            <li>
                <div class="inline-block rounded-sm px-3 py-3 outline-none focus-visible:ring-2"
                    :class="setActiveClass(4)">
                    <p>Confirm</p>
                </div>
            </li>
        </ul>

        <fieldset v-if="step == 1">
            test
        </fieldset>
        <fieldset v-if="step == 2">
            hello
        </fieldset>
        <fieldset v-if="step == 3">
            world
        </fieldset>
        <fieldset v-if="step == 4">
            final
        </fieldset>
        <div class=" flex gap-2">
            <button v-if="step > 1" @click="step--"
                class="rounded-md bg-themeOffWhite px-4 py-2 text-themeBrown border border-themeBrown">Previous</button>
            <button v-if="step < 4" @click="step++"
                class="rounded-md bg-themeOffWhite px-4 py-2 text-themeBrown border border-themeBrown">Next</button>
            <button v-if="step == 4"
                class="rounded-md bg-themeOffWhite px-4 py-2 text-themeBrown border border-themeBrown">Confirm</button>
        </div> -->

    </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ReservationNavigation from '../../components/generic/ReservationNavigation.vue'

// const step = ref(1)
// const setActiveClass = (current: number) => {
//     return step.value == current ? 'border-themeBrown border-b-3' : ''
// }
</script>