<template>
    <section class="grid gap-2 grid-cols-1 md:grid-cols-3">
        <label class="mb-1 block text-neutral-500 focus-within:text-neutral-900" for="reservationStartDate">
            <span class="mb-2 block font-title">Start date</span>
            <input id="reservationStartDate"
                class="w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none ring-themeBrown focus-visible:ring"
                type="date" name="reservationStartDate" />
        </label>
        <label class="mb-1 block text-neutral-500 focus-within:text-neutral-900" for="reservationEndDate">
            <span class="mb-2 block font-title">End date</span>
            <input id="reservationEndDate"
                class="w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none ring-themeBrown focus-visible:ring"
                type="date" name="reservationEndDat" />
        </label>

        <div class="grid gap-2 grid-cols-2">
            <label class="mb-1 block text-neutral-500 focus-within:text-neutral-900" for="amountAdults">
                <span class="mb-2 block font-title">Amount Adults</span>
                <input id="amountAdults"
                    class="w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none ring-themeBrown focus-visible:ring"
                    type="number" name="amountAdults" value="0" />
            </label>
            <label class="mb-1 block text-neutral-500 focus-within:text-neutral-900" for="amountChildren">
                <span class="mb-2 block font-title">Amount children</span>
                <input id="amountChildren"
                    class="w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none ring-themeBrown focus-visible:ring"
                    type="number" name="amountChildren" value="0" />
            </label>
        </div>
    </section>
    <section class="py-3">
        <div class="grid animate-pulse gap-12 sm:grid-cols-2 md:grid-cols-3" v-if="loading">
            <div v-for="i of skeletons" :key="i">
                <div class="@dark:bg-neutral-700 aspect-square rounded-md bg-neutral-300"></div>
                <p class="@dark:bg-neutral-600 my-1 h-6 w-24 rounded bg-neutral-200"></p>
                <p class="@dark:bg-neutral-600 my-2 h-6 w-12 rounded bg-neutral-100"></p>
            </div>
        </div>
        <div v-else-if="error">
            <p>Error happened.</p>
        </div>
        <div class="grid gap-12 sm:grid-cols-2 md:grid-cols-3" v-else-if="result">
            <div v-for="r of result.rooms" :key="r.id">
                <img v-if="r.category == 'luxe'" class="w-full mb-6 object-cover aspect-video" :src="luxe"
                    :alt="`picture of a ${r.category}-suite`" />
                <img v-else-if="r.category == 'standard'" class="w-full mb-6 object-cover aspect-video" :src="standard"
                    :alt="`picture of a ${r.category}-suite`" />
                <img v-else class="w-full mb-6 object-cover aspect-video" :src="standard"
                    :alt="`picture of a standard-suite`" />
                <h2 class="font-theme text-2xl font-title font-bold">{{ r.name }}</h2>
                <p class="text-sm font-semibold tracking-wide text-neutral-500 line-clamp-3">
                    {{ r.description }}
                </p>
            </div>
        </div>
    </section>

</template>
<script setup lang="ts">

import { useQuery } from "@vue/apollo-composable";
import { ref } from "vue";
import { GET_ROOMS } from '../../../graphql/query.room'
import useFormUpdate from "../../../composables/useFormUpdate";

import luxe from '../../../assets/luxe-suite.webp'
import standard from '../../../assets/standard-suite.webp'

const { result, loading, error } = useQuery(GET_ROOMS)
const skeletons = ref(18)

const { reservationInput } = useFormUpdate()

</script>