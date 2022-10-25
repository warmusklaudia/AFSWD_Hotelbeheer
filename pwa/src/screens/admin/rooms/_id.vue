<template>
  <main class="bg-themeWhite flex h-full">
    <section class="flex h-full w-full">
      <admin-navigation />
      <div class="w-5/6 p-6">
        <admin-header :name="`Room ${params.id}`" />
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import RouteHolder from '../../../components/holders/RouteHolder.vue'
import AdminNavigation from '../../../components/generic/AdminNavigation.vue'
import AdminHeader from '../../../components/generic/AdminHeader.vue'
import { Search, Plus, Frown } from 'lucide-vue-next'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import { Room } from '../../../interfaces/interface.room'
import { ROOM_BY_ID } from '../../../graphql/query.room'
export default {
  components: {
    RouteHolder,
    AdminNavigation,
    AdminHeader,
    Search,
    Plus,
    Frown,
  },
  setup() {
    const { params } = useRoute()
    const { result, loading, error } = useQuery<{ room: Room }>(ROOM_BY_ID, {
      id: params.id,
    })

    return {
      result,
      loading,
      error,
      params,
    }
  },
}
</script>
