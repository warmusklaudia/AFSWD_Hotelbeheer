<template>
  <div class="flex w-full justify-between">
    <route-holder :title="name" />
    <div
      class="bg-themeGreen col-end-3 flex h-12 w-12 cursor-pointer items-center justify-center justify-self-end rounded-full text-white shadow-md md:col-end-7 md:h-14 md:w-14 lg:col-end-8 lg:h-16 lg:w-16"
    >
      <bell-ring />
      <div class="absolute ml-4 mt-4 h-2 w-2 rounded-full bg-red-600"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BellRing } from 'lucide-vue-next'
import RouteHolder from '../../components/holders/RouteHolder.vue'

const { name } = defineProps<{
  name: string
}>()
</script>
