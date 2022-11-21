<template>
    <RouteHolder title="Services">
        <template #header-actions>
            <router-link to="/services/add"
                class="rounded-md bg-themeOffWhite px-4 py-2 text-themeBrown border border-themeBrown">
                Add
            </router-link>
        </template>
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
            <div v-for="rs of result.findByUserId" :key="rs.id"
                class="max-h-56 p-4 shadow-md rounded flex flex-col justify-between">
                <h2 class="font-title text-lg font-bold pb-3 border-b-2 border-black">{{ rs.service.name }}</h2>
                <div class="flex gap-3 items-center">
                    <Calendar />
                    <p class="text-sm font-semibold tracking-wide">
                        {{ new Date(rs.requestedDate).toLocaleDateString() }}
                    </p>
                </div>
                <!-- <div>
                    <div class="flex gap-3 items-center">
                        <Users />
                        <p class="text-sm font-semibold tracking-wide">{{ r.amountAdults }} adults</p>
                    </div>
                    <div class="flex gap-3 items-center">
                        <Users />
                        <p class="text-sm font-semibold tracking-wide">{{ r.amountChildren }} children</p>
                    </div>
                </div> -->
                <div class="flex gap-3 items-center mb-3">
                    <Banknote />
                    <p class="text-sm font-semibold tracking-wide">€ {{ rs.service.price }}</p>
                </div>
            </div>
        </div>
    </RouteHolder>
</template>

<script setup lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { ref, watch } from "vue";
import { Banknote, Calendar } from "lucide-vue-next";

import RouteHolder from '../../components/holders/RouteHolder.vue'
import { GET_REQUESTED_SERVICES, GET_REQUESTED_SERVICES_BY_USER_ID } from "../../graphql/query.requestedService";

import useAuthentication from "../../composables/useAuthentication";

const { user } = useAuthentication()

console.log(user.value?.uid)

const { result, loading, error } = useQuery(GET_REQUESTED_SERVICES_BY_USER_ID, () => ({
    uid: user.value?.uid!
}));

watch(result, (val) => {
    console.log(val)
})

const skeletons = ref(6)
</script>