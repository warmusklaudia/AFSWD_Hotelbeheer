<template>
    <RouteHolder title="Rooms">
        <div class="grid animate-pulse gap-12 sm:grid-cols-2 md:grid-cols-3" v-if="loading">
            <div v-for="i of skeletons" :key="i">
                <div class="@dark:bg-neutral-700 aspect-video rounded-md bg-neutral-300"></div>
                <p class="@dark:bg-neutral-600 my-1 h-6 w-24 rounded bg-neutral-200"></p>
                <p class="@dark:bg-neutral-600 my-2 h-6 w-12 rounded bg-neutral-100"></p>
            </div>
        </div>
        <div v-else-if="error">
            <p>Error happened.</p>
        </div>
        <div class="grid gap-12 sm:grid-cols-2 md:grid-cols-3" v-else-if="result">
            <RouterLink :to="`reservations/${r.id}`" v-for="r of result.rooms" :key="r.id">
                <img v-if="r.category == 'luxe'" class="w-full mb-6 object-cover aspect-video" :src="luxe"
                    :alt="`picture of a ${r.category}-suite`" />
                <img v-else-if="r.category == 'standard'" class="w-full mb-6 object-cover aspect-video" :src="standard"
                    :alt="`picture of a ${r.category}-suite`" />
                <img v-else class="w-full mb-6 object-cover aspect-video" :src="standard"
                    :alt="`picture of a standard-suite`" />
                <ul class="flex gap-1">
                    <li v-for="n in r.rating">
                        <Star class="fill-themeBrown stroke-themeBrown" />
                    </li>
                    <li v-if="r.rating < 5" v-for="n in 5 - r.rating">
                        <Star />
                    </li>
                </ul>
                <h2 class="font-theme text-2xl font-title font-bold">{{ r.name }}</h2>
                <p class="text-sm font-semibold tracking-wide text-neutral-500 line-clamp-3">
                    {{ r.description }}
                </p>
            </RouterLink>
        </div>
    </RouteHolder>
</template>

<script setup lang="ts">
import { Ref, ref } from "vue";
import { useQuery } from '@vue/apollo-composable'
import { Star } from "lucide-vue-next";

import RouteHolder from '../../components/holders/RouteHolder.vue'
import { GET_ROOMS } from "../../graphql/query.room";

import luxe from '../../assets/luxe-suite.webp'
import standard from '../../assets/standard-suite.webp'

const { result, loading, error } = useQuery(GET_ROOMS)
const skeletons: Ref<number> = ref(18)


</script>