<template>
  <main class="bg-themeWhite flex h-full">
    <section class="flex h-full w-full">
      <admin-navigation />
      <div class="w-5/6 p-6">
        <admin-header name="Pricing" />
        <div className="p-6 md:flex"></div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import RouteHolder from '../../components/holders/RouteHolder.vue'
import AdminNavigation from '../../components/generic/AdminNavigation.vue'
import AdminHeader from '../../components/generic/AdminHeader.vue'
import { Search } from 'lucide-vue-next'
</script>
