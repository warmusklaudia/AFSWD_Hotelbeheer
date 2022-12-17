<template>
  <RouteHolder
    title=""
    class="bg-[url(/background-home.jpeg)] bg-cover md:bg-center"
  >
    <div class="flex h-full items-center justify-end p-10">
      <div class="absolute mt-1 lg:mt-2">
        <h1
          class="font-title text-themeBrown max-w-sm text-right text-4xl md:max-w-lg md:text-6xl lg:max-w-4xl lg:text-8xl"
        >
          Make your holiday memorable
        </h1>
      </div>
      <div class="absolute m-1 lg:m-2">
        <h1
          class="font-title max-w-sm text-right text-4xl text-white md:max-w-lg md:text-6xl lg:max-w-4xl lg:text-8xl"
        >
          Make your holiday memorable
        </h1>
      </div>
    </div>
  </RouteHolder>
</template>

<script setup lang="ts">
import RouteHolder from '../components/holders/RouteHolder.vue'
</script>
