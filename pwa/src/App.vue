<template>
  <div>
    <RouterView class="min-h-screen" />
  </div>
</template>

<script setup lang="ts">
import useGraphql from './composables/useGraphql'
import { provide } from '@vue/runtime-core'
import { DefaultApolloClient } from '@vue/apollo-composable'

const { apolloClient } = useGraphql()

provide(DefaultApolloClient, apolloClient)
</script>
