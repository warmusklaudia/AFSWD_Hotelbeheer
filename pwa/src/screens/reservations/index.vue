<template>
    <RouteHolder title="Reservations">
        <template #header-actions>
            <router-link to="/reservations/add"
                class="rounded-md bg-themeOffWhite px-4 py-2 text-themeBrown border border-themeBrown">
                Add 
            </router-link>
        </template>
        <!-- <div class="grid animate-pulse gap-12 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5"> -->
        <div class="grid animate-pulse gap-12 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5" v-if="loading">
            <div v-for="i of skeletons" :key="i">
                <div class="@dark:bg-neutral-700 aspect-square rounded-md bg-neutral-300"></div>
                <p class="@dark:bg-neutral-600 my-1 h-6 w-24 rounded bg-neutral-200"></p>
                <p class="@dark:bg-neutral-600 my-2 h-6 w-12 rounded bg-neutral-100"></p>
            </div>
        </div>
        <div v-else-if="error">
            <p>Error happened.</p>
        </div>
        <div class="grid gap-12 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5" v-else-if="result">
            <RouterLink :to="`reservations/${r.id}`" v-for="r of result.reservations" :key="r.id">
                <h2 class="font-theme text-2xl font-light">{{ r.name }}</h2>
                <p class="text-sm font-semibold tracking-wide text-neutral-500">
                    {{ r.category }}
                </p>
            </RouterLink>
        </div>
    </RouteHolder>
</template>

<script setup lang="ts">
import { Ref, ref } from "vue";
import { useQuery } from '@vue/apollo-composable'

import RouteHolder from '../../components/holders/RouteHolder.vue'
import { GET_RESERVATIONS } from "../../graphql/query.reservation";

const { result, loading, error } = useQuery(GET_RESERVATIONS)
const skeletons: Ref<number> = ref(18)

</script>