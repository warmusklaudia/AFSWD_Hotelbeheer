<template>
    <header class="px-6 mb-6 md:bg-themeOffWhite">
        <nav class="mx-auto flex max-w-6xl items-center justify-between">
            <router-link class="rounded-md outline-none focus-visible:right-2" to="/">
                <span class="font-title">Hotel</span>
            </router-link>

            <AppNavigation class="hidden sm:flex" />
        </nav>
    </header>
</template>

<script setup lang="ts">

import AppNavigation from './AppNavigation.vue'

</script>