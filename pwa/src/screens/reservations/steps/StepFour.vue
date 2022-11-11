<template>
    <section>
        <h2 class="font-title font-bold text-2xl md:text-3xl lg:text-4xl mb-6 text-center">Your booking is confirmed
        </h2>
        <div class="grid md:grid-cols-[1fr_2fr] gap-6">
            <div>
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

            <div v-if="loading" class="grid grid-cols-3">
                <div v-for="i of skeletons" :key="i">
                    <div class="@dark:bg-neutral-700 aspect-square rounded-md bg-neutral-300"></div>
                    <p class="@dark:bg-neutral-600 my-1 h-6 w-24 rounded bg-neutral-200"></p>
                    <p class="@dark:bg-neutral-600 my-2 h-6 w-12 rounded bg-neutral-100"></p>
                </div>
            </div>
            <div v-else-if="error">
                <p>Error happened.</p>
            </div>
            <div v-else-if="result" class="grid md:grid-cols-3">
                <div>
                    <p class="font-title font-bold">Guest</p>
                    <p class="max-w-[14rem] break-words">{{ user?.displayName }}</p>
                </div>
                <div>
                    <p class="font-title font-bold">Check-in</p>
                    <p>{{ new Date(result.reservation.reservationStartDate).toLocaleDateString() }}</p>
                </div>
                <div>
                    <p class="font-title font-bold">Check-out</p>
                    <p>{{ new Date(result.reservation.reservationEndDate).toLocaleDateString() }}</p>
                </div>
                <div>
                    <p class="font-title font-bold">Reservation Nr.</p>
                    <p>{{ result.reservation.id }}</p>
                </div>
                <div>
                    <p class="font-title font-bold">Email</p>
                    <p class="max-w-[14rem] break-words">{{ user?.email }}</p>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import { Star } from "lucide-vue-next";
import { useQuery } from "@vue/apollo-composable";

import useAuthentication from "../../../composables/useAuthentication";
import useFormUpdate from "../../../composables/useFormUpdate";

import luxe from '../../../assets/luxe-suite.webp'
import standard from '../../../assets/standard-suite.webp'

import { GET_RESERVATION_BY_ID } from "../../../graphql/query.reservation";
import { ref } from "vue";

const skeletons = ref(5)

const { user } = useAuthentication()
const { selectedRoom, reservationId } = useFormUpdate()

const { result, loading, error } = useQuery(GET_RESERVATION_BY_ID, {
    id: reservationId.value
})

</script>