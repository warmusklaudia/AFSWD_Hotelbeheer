<template>
    <RouteHolder title="Reservation">
        <div v-if="loading">
            <p>Loading</p>
        </div>
        <div v-else-if="error">
            <p>Error happened.</p>
        </div>
        <div v-else-if="result" class="grid md:grid-cols-2 gap-6">
            <div class="order-last md:order-first">
                <h2 class="font-bold text-2xl mb-3">Room(s)</h2>
                <ul class="grid">
                    <li v-for="r of result.reservation.rooms">

                        <div class="grid md:grid-cols-[auto_1fr] gap-6">
                            <img v-if="r.category.toLowerCase() == 'luxe'"
                                class="@dark:bg-neutral-700 aspect-square block object-cover max-h-40 rounded-md bg-neutral-300"
                                :src="luxe" :alt="`picture of a ${r.category.toLowerCase()}-suite`" />
                            <img v-else-if="result.category == 'standard'"
                                class="@dark:bg-neutral-700 aspect-square block object-cover max-h-40 rounded-md bg-neutral-300"
                                :src="standard" :alt="`picture of a ${r.category.toLowerCase()}-suite`" />
                            <img v-else
                                class="@dark:bg-neutral-700 aspect-square block object-cover max-h-40 rounded-md bg-neutral-300"
                                :src="standard" :alt="`picture of a standard-suite`" />
                            <div class="flex flex-col justify-between">
                                <h2 class="font-title font-bold text-lg">{{ r.name }}</h2>
                                <p class="text-sm font-semibold tracking-wide text-neutral-500 line-clamp-5">{{
                                        r.description
                                }}</p>
                                <p class="font-semibold">Price: € {{ r.category.toLowerCase() === 'luxe' ? 500 :
                                        300
                                }}</p>
                            </div>
                        </div>
                    </li>
                    <li v-for="room of result.reservation.rooms" class="overflow-y-auto">
                        <img v-if="room.category.toLowerCase() == 'luxe'"
                            class="w-2/4 object-cover aspect-video rounded-md" :src="luxe"
                            :alt="`picture of a ${room.category.toLowerCase()}-suite`" />
                        <img v-else-if="room.category.toLowerCase() == 'standard'"
                            class="w-2/4 object-cover aspect-video rounded-md" :src="standard"
                            :alt="`picture of a ${room.category}-suite`" />
                        <img v-else class="w-2/4 object-cover aspect-video rounded-md" :src="standard"
                            :alt="`picture of a standard-suite`" />
                        <div>
                            <h3>{{ room.name }}</h3>
                            <ul class="flex gap-1 mb-3">
                                <li v-for="n in room.rating">
                                    <Star class="fill-themeBrown stroke-themeBrown" />
                                </li>
                                <li v-if="room.rating < 5" v-for="n in 5 - result.room.rating">
                                    <Star />
                                </li>
                            </ul>
                            <p class="tracking-wide md:text-lg mb-3">
                                {{ room.description }}
                            </p>
                            <p class="font-semibold">Price: € {{ room.category.toLowerCase() === 'luxe' ? 500 :
                                    300
                            }}</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="order-first	md:order-last">
                <h2 class="font-bold text-2xl mb-3">Details</h2>
                <div class="grid md:grid-cols-2 gap-6">
                    <div>
                        <p class="font-title font-bold">Reservation Nr.</p>
                        <p>{{ result.reservation.id }}</p>
                    </div>
                    <div>
                        <p class="font-title font-bold">Guest</p>
                        <p>{{ user?.displayName }}</p>
                    </div>
                    <div>
                        <p class="font-title font-bold">Check-in</p>
                        <p>{{ new Date(result.reservation.reservationStartDate).toLocaleDateString() }}</p>
                    </div>
                    <div>
                        <p class="font-title font-bold">Check-out</p>
                        <p>{{ new Date(result.reservation.reservationEndDate).toLocaleDateString() }}</p>
                    </div>
                    <div class="md:col-span-2">
                        <p class="font-title font-bold">Email</p>
                        <p class="max-w-[14rem] md:max-w-none break-words">{{ user?.email }}</p>
                    </div>
                </div>

            </div>
        </div>
    </RouteHolder>
</template>
<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { useRoute } from 'vue-router'

import { Star } from "lucide-vue-next";

import RouteHolder from '../../components/holders/RouteHolder.vue'
import useAuthentication from "../../composables/useAuthentication";

import luxe from '../../assets/luxe-suite.webp'
import standard from '../../assets/standard-suite.webp'

import { GET_RESERVATION_BY_ID } from "../../graphql/query.reservation";

const { params } = useRoute()
const { user } = useAuthentication()

const { result, loading, error } = useQuery(GET_RESERVATION_BY_ID, () => ({
    id: params.id
}))

</script>