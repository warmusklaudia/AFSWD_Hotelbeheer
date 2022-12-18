<template>
  <header class="md:bg-themeOffWhite px-6 py-6 drop-shadow-md md:py-0">
    <nav class="mx-auto flex max-w-6xl items-center justify-between">
      <router-link
        class="place-self-end rounded-md outline-none focus-visible:right-2"
        to="/"
      >
        <Logo class="h-16 w-16" />
      </router-link>

      <AppNavigation class="hidden sm:flex" />
    </nav>
  </header>
</template>

<script setup lang="ts">
import Logo from '../../assets/svg/Logo.vue'
import AppNavigation from './AppNavigation.vue'
</script>
