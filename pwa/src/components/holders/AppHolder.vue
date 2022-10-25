<template>
    <div class="grid h-screen min-h-screen grid-rows-[auto_1fr_auto] sm:h-auto">
        <AppHeader />
        <RouterView />
        <AppFooter />
    </div>
</template>

<script setup lang="ts">
import AppHeader from "../generic/AppHeader.vue";
import AppFooter from "../generic/AppFooter.vue";
import Home from "../../screens/Home.vue"
</script>