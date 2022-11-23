<template>
  <div>
    <div
      class="fixed top-0 left-0 z-20 h-full w-full bg-neutral-900 bg-opacity-25"
      @click="togglePopup()"
    ></div>
    <div
      class="fixed top-1/2 left-1/2 z-30 h-96 w-2/3 -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white pt-6 text-lg shadow-lg md:h-96 md:w-2/5"
    >
      <div class="flex h-full flex-col justify-between">
        <div class="text-themeGreen mx-6 text-center">
          <button
            @click="togglePopup()"
            class="border-themeGreen float-right flex h-8 w-8 items-center justify-center self-end rounded-full border"
          >
            <X />
          </button>
          <h2 class="font-title self-center text-2xl font-bold">
            Room <span class="text-xl">{{ id }}</span>
          </h2>
        </div>
        <ul class="ml-10 flex flex-col gap-2">
          <li>
            <label for="linens" class="flex gap-2">
              <input id="linens" type="checkbox" class="peer sr-only" />
              <div
                class="peer-checked:bg-themeOffWhite border-themeBrown h-6 w-6 rounded-md border bg-white shadow-inner"
              ></div>
              <div
                class="text-themeBrown invisible absolute flex h-6 w-6 items-center justify-center peer-checked:visible"
              >
                <Check size="20" />
              </div>
              Change the linens
            </label>
          </li>
          <li>
            <label for="trash" class="flex gap-2">
              <input id="trash" type="checkbox" class="peer sr-only" />
              <div
                class="peer-checked:bg-themeOffWhite border-themeBrown h-6 w-6 rounded-md border bg-white shadow-inner"
              ></div>
              <div
                class="text-themeBrown invisible absolute flex h-6 w-6 items-center justify-center peer-checked:visible"
              >
                <Check size="20" />
              </div>
              Clear the trash
            </label>
          </li>
          <li>
            <label for="sufraces" class="flex gap-2">
              <input id="sufraces" type="checkbox" class="peer sr-only" />
              <div
                class="peer-checked:bg-themeOffWhite border-themeBrown h-6 w-6 rounded-md border bg-white shadow-inner"
              ></div>
              <div
                class="text-themeBrown invisible absolute flex h-6 w-6 items-center justify-center peer-checked:visible"
              >
                <Check size="20" />
              </div>
              Disinfect surfaces
            </label>
          </li>
          <li>
            <label for="bathroom" class="flex gap-2">
              <input id="bathroom" type="checkbox" class="peer sr-only" />
              <div
                class="peer-checked:bg-themeOffWhite border-themeBrown h-6 w-6 rounded-md border bg-white shadow-inner"
              ></div>
              <div
                class="text-themeBrown invisible absolute flex h-6 w-6 items-center justify-center peer-checked:visible"
              >
                <Check size="20" />
              </div>
              Clean the bathroom
            </label>
          </li>
          <li>
            <label for="vacuumFloors" class="flex gap-2">
              <input id="vacuumFloors" type="checkbox" class="peer sr-only" />
              <div
                class="peer-checked:bg-themeOffWhite border-themeBrown h-6 w-6 rounded-md border bg-white shadow-inner"
              ></div>
              <div
                class="text-themeBrown invisible absolute flex h-6 w-6 items-center justify-center peer-checked:visible"
              >
                <Check size="20" />
              </div>
              Vacuum the floors
            </label>
          </li>
          <li>
            <label for="mopFloors" class="flex gap-2">
              <input id="mopFloors" type="checkbox" class="peer sr-only" />
              <div
                class="peer-checked:bg-themeOffWhite border-themeBrown h-6 w-6 rounded-md border bg-white shadow-inner"
              ></div>
              <div
                class="text-themeBrown invisible absolute flex h-6 w-6 items-center justify-center peer-checked:visible"
              >
                <Check size="20" />
              </div>
              Mop the floors
            </label>
          </li>
        </ul>
        <div>
          <button
            @click="togglePopup()"
            class="border-themeBrown bg-themeOffWhite text-themeBrown focus:ring-themeBrown hover:bg-themeBrown m-auto mb-6 flex items-center rounded-md border px-6 py-2 text-sm hover:bg-opacity-20 focus:outline-none focus:ring"
          >
            MARK AS CLEANED
          </button>
        </div>
      </div>
    </div>
    <div
      class="bg-themeBrown fixed top-1/2 left-1/2 z-20 m-2 h-96 w-2/3 -translate-x-1/2 -translate-y-1/2 transform rounded-lg pt-6 text-lg shadow-lg md:h-96 md:w-2/5"
    ></div>
  </div>
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { Check, X } from 'lucide-vue-next'
import { useRoute } from 'vue-router'
import { ROOM_BY_ID } from '../../graphql/query.room'
import Room from '../../interfaces/interface.room'

export default {
  props: {
    togglePopup: {
      type: Function,
      required: true,
    },
    id: {
      type: String as () => string,
      required: true,
    },
  },
  setup() {
    const { params } = useRoute()
    // const { result, loading, error } = useQuery<{ room: Room }>(ROOM_BY_ID, {
    //   id: params.id,
    // })
    return {
      params,
    }
  },
  components: { Check, X },
}
</script>
