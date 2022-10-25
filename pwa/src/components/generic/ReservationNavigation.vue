<template>
    <ul
        class="grid w-full font-title font-bold grid-cols-4 items-center text-center text-xs sm:w-auto sm:space-x-3 sm:text-left sm:text-sm mb-6">
        <li>
            <router-link class=" inline-block rounded-sm px-3 py-3 outline-none focus-visible:ring-2" to="1"
                exact-active-class="border-themeBrown border-b-3">
                <p>Date & Room</p>
            </router-link>
        </li>
        <li>
            <router-link class=" inline-block rounded-sm px-3 py-3 outline-none focus-visible:ring-2" to="2"
                exact-active-class="border-themeBrown border-b-3">
                <p>Personal information</p>
            </router-link>
        </li>
        <li>
            <router-link class="inline-block rounded-sm px-3 py-3 outline-none focus-visible:ring-2" to="3"
                exact-active-class="border-themeBrown border-b-3">
                <p>Payment</p>
            </router-link>
        </li>
        <li>
            <router-link class="inline-block rounded-sm px-3 py-3 outline-none focus-visible:ring-2" to="4"
                exact-active-class="border-themeBrown border-b-3">
                <p>Confirm</p>
            </router-link>
        </li>
    </ul>
</template>

<script setup lang="ts">

</script>