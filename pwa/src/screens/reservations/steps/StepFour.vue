<template>
    <section>
        <h2 class="font-title font-bold text-2xl md:text-3xl lg:text-4xl mb-6 text-center">Your booking is confirmed
        </h2>
        <div class="grid grid-cols-[1fr_2fr]">
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
            <div class="grid grid-cols-3">
                <div>
                    <p class="font-title font-bold">Guest</p>
                    <p>{{ user?.displayName }}</p>
                </div>
                <div>
                    <p class="font-title font-bold">Check-in</p>
                </div>
                <div>
                    <p class="font-title font-bold">Check-out</p>
                </div>
                <div>
                    <p class="font-title font-bold">Reservation Nr.</p>
                </div>
                <div>
                    <p class="font-title font-bold">Email</p>
                    <p>{{ user?.email }}</p>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import { Star } from "lucide-vue-next";

import useAuthentication from "../../../composables/useAuthentication";
import useFormUpdate from "../../../composables/useFormUpdate";

import luxe from '../../../assets/luxe-suite.webp'
import standard from '../../../assets/standard-suite.webp'

const { user } = useAuthentication()
const { selectedRoom } = useFormUpdate()
</script>