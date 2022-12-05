<template>
  <div>
    <RouterView class="min-h-screen" />
  </div>
</template>

<script setup lang="ts">
import useGraphql from './composables/useGraphql'
import { provide } from '@vue/runtime-core'
import { DefaultApolloClient } from '@vue/apollo-composable'
import useCustomUser from './composables/useCustomUser'

const { apolloClient } = useGraphql()
const { loadCustomUser } = useCustomUser()

provide(DefaultApolloClient, apolloClient)
</script>
