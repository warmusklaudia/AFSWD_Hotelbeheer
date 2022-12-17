<template>
  <div class="grid min-h-screen place-items-center">
    <div class="w-full max-w-lg px-6">
      <div class="flex items-center justify-center">
        <Logo class="h-20 w-20" />
      </div>
      <div class="mb-20 rounded-md bg-white p-6 shadow">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from '../../assets/svg/Logo.vue'
</script>
