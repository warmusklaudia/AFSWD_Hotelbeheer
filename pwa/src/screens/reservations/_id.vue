<template>
    <RouteHolder title="Reservation">
        <div v-if="loading">
            <p>Loading</p>
        </div>
        <div v-else-if="error">
            <p>Error happened.</p>
        </div>
        <div v-else-if="result" class="grid md:grid-cols-2">
            <div>
                <h2 class="font-bold text-2xl">Rooms</h2>
                <ul>
                    <li v-for="room of result.reservation.rooms">
                        <p>{{ room.name }}</p>
                    </li>
                </ul>
            </div>
            <div>
                <h2 class="font-bold text-2xl">Details</h2>

            </div>
        </div>
    </RouteHolder>
</template>
<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { useRoute } from 'vue-router'

import RouteHolder from '../../components/holders/RouteHolder.vue'
import { GET_RESERVATION_BY_ID } from "../../graphql/query.reservation";

const { params } = useRoute()

const { result, loading, error } = useQuery(GET_RESERVATION_BY_ID, () => ({
    id: params.id
}))

console.log(result)

</script>