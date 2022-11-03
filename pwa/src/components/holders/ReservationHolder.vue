<template>
    <div class="grid grid-rows-[auto_1fr] min-h-fit gap-3">
        <ReservationNavigation />
        <form @submit.prevent="" class="flex flex-col justify-between gap-6">
            <RouterView />
        </form>
    </div>

</template>

<script setup lang="ts">
import ReservationNavigation from '../../components/generic/ReservationNavigation.vue'

</script>