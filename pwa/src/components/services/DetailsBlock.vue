<template>
  <div v-if="result" class="pt-3 md:pt-0 md:pl-6">
    <div
      class="absolute flex h-80 w-80 flex-col justify-between rounded-md bg-white p-6 lg:h-96 lg:w-96"
    >
      <div>
        <div class="flex items-center gap-4 pb-6">
          <div
            class="bg-themeGreen flex h-14 w-14 items-center justify-center rounded-full"
          >
            <p class="font-title text-lg text-white">
              {{ result.requestedService.user.firstName[0]
              }}{{ result.requestedService.user.lastName[0] }}
            </p>
          </div>
          <h2 class="font-title text-lg">
            {{ result.requestedService.user.firstName }}
            {{ result.requestedService.user.lastName }}
          </h2>
        </div>
        <p>
          <span>{{ result.requestedService.service.name }}</span> asked on
          <span>{{
            new Date(result.requestedService.requestedDate).toLocaleDateString()
          }}</span>
        </p>
        <p>Message:</p>
        <p
          v-if="result.requestedService.message"
          class="italic text-neutral-500"
        >
          {{ result.requestedService.message }}
        </p>
        <p v-else class="italic text-neutral-500">No message</p>
      </div>
      <button
        class="border-themeBrown bg-themeOffWhite text-themeBrown focus:ring-themeBrown hover:bg-themeBrown rounded-md border px-6 py-2 text-sm hover:bg-opacity-20 focus:outline-none focus:ring"
      >
        MARK AS RESOLVED
      </button>
    </div>
    <div
      class="bg-themeBrown m-2 h-80 w-80 rounded-md shadow-md lg:h-96 lg:w-96"
    ></div>
  </div>
  <div v-else class="pl-6">
    <div class="flex h-full w-full items-center justify-center">
      <h1 class="font-title text-xl text-neutral-500">Choose a service</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { ref, watch } from 'vue'
import { GET_REQUESTED_SERVICE } from '../../graphql/query.requestedService'

export default {
  props: {
    id: {
      type: String as () => string,
      required: true,
    },
  },
  setup(props) {
    const id = ref<string>(props.id)
    const { result, loading, error, refetch } = useQuery(
      GET_REQUESTED_SERVICE,
      {
        id: id,
      },
    )

    watch(result, () => {
      console.log(result)
    })

    watch(props, () => {
      if (props.id !== '') {
        id.value = props.id
        refetch()
      }
      console.log('detail page', props.id)
    })
    return { result, loading, error }
  },
}
</script>
