<template>
  <div>
    <RouterView class="min-h-screen" />
  </div>
</template>

<script setup lang="ts">
import useCustomUser from './composables/useCustomUser'
import useAuthentication from './composables/useAuthentication'
import useGraphql from './composables/useGraphql'
import { provide } from '@vue/runtime-core'
import { DefaultApolloClient } from '@vue/apollo-composable'

const { user } = useAuthentication()
const { apolloClient } = useGraphql()
const { loadCustomUser } = useCustomUser()

provide(DefaultApolloClient, apolloClient)
</script>
