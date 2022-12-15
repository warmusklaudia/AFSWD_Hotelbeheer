<template>
    <RouteHolder :title="result ? result.room.name : '...'">
        <div v-if="loading">
            <p>Loading</p>
        </div>
        <div v-else-if="error">
            <p>Error happened.</p>
        </div>
        <div v-else-if="result" class="grid grid-rows-[auto_1fr] md:grid-cols-2 md:gap-12 gap-6">
            <img v-if="result.room.category.toLowerCase() == 'luxe'" class="w-full object-cover aspect-video rounded-md"
                :src="luxe" :alt="`picture of a ${result.room.category.toLowerCase() }-suite`" />
            <img v-else-if="result.room.category.toLowerCase() == 'standard'" class="w-full object-cover aspect-video rounded-md"
                :src="standard" :alt="`picture of a ${result.room.category}-suite`" />
            <img v-else class="w-full object-cover aspect-video rounded-md" :src="standard"
                :alt="`picture of a standard-suite`" />
            <div>
                <ul class="flex gap-1 mb-3">
                    <li v-for="n in result.room.rating">
                        <Star class="fill-themeBrown stroke-themeBrown" />
                    </li>
                    <li v-if="result.room.rating < 5" v-for="n in 5 - result.room.rating">
                        <Star />
                    </li>
                </ul>
                <p class="tracking-wide md:text-lg mb-3">
                    {{ result.room.description }}
                </p>
                <p class="font-semibold">Price: € {{ result.room.category.toLowerCase() === 'luxe' ? 500 : 300 }}</p>
            </div>

        </div>
    </RouteHolder>
</template>
<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { useRoute } from 'vue-router'

import { Star } from "lucide-vue-next";

import RouteHolder from '../../components/holders/RouteHolder.vue'
import luxe from '../../assets/luxe-suite.webp'
import standard from '../../assets/standard-suite.webp'
import { GET_ROOM_BY_ID } from "../../graphql/query.room";

const { params } = useRoute()

const { result, loading, error } = useQuery(GET_ROOM_BY_ID, () => ({
    id: params.id
}))
</script>