<template>
    <ul
        class="grid w-full font-title font-bold grid-cols-4 items-center text-center text-xs sm:w-auto sm:space-x-3 sm:text-left sm:text-base mb-3">
        <li>
            <router-link class=" inline-block rounded-sm px-3 py-3 outline-none focus-visible:ring-2 ring-themeBrown pointer-events-none" to="1"
                exact-active-class="border-themeBrown border-b-3">
                <p>Date & Room</p>
            </router-link>
        </li>
        <li>
            <router-link class=" inline-block rounded-sm px-3 py-3 outline-none focus-visible:ring-2 ring-themeBrown pointer-events-none"
                 exact-active-class="border-themeBrown border-b-3" to="2">
                <p>Personal info</p>
            </router-link>
        </li>
        <li>
            <router-link class="inline-block rounded-sm px-3 py-3 outline-none focus-visible:ring-2 ring-themeBrown pointer-events-none"
                 exact-active-class="border-themeBrown border-b-3" to="3">
                <p>Payment</p>
            </router-link>
        </li>
        <li>
            <router-link class="inline-block rounded-sm px-3 py-3 outline-none focus-visible:ring-2 ring-themeBrown pointer-events-none"
                exact-active-class="border-themeBrown border-b-3" to="4">
                <p>Confirm</p>
            </router-link>
        </li>
    </ul>
</template>

<script setup lang="ts">
import useFormUpdate from "../../composables/useFormUpdate";

// const { currentStep } = useFormUpdate()
// const setActiveClass = (current: number) => {
//     return currentStep.value <= current ? 'pointer-events-none' : ''
// }
</script>