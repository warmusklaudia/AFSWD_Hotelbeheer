<template>
  <div>
    <div
      class="fixed top-0 left-0 z-20 h-full w-full bg-neutral-900 bg-opacity-25"
      @click="togglePopup()"
    ></div>
    <div
      class="fixed top-1/2 left-1/2 z-30 h-96 w-2/3 -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white pt-6 text-lg shadow-lg md:h-96 md:w-2/5"
    >
      <div class="animate-pulse p-6" v-if="loading">
        <div
          class="mb-4 aspect-square h-10 w-full rounded-md bg-neutral-300"
        ></div>
        <div
          class="mb-4 aspect-square h-10 w-full rounded-md bg-neutral-300"
        ></div>
        <div
          class="mb-4 aspect-square h-10 w-full rounded-md bg-neutral-300"
        ></div>
      </div>
      <div class="flex items-center justify-center" v-else-if="error">
        <p class="ml-6 text-xl md:mr-2">Error happened</p>
        <Frown />
      </div>
      <div class="flex h-full flex-col justify-between" v-else-if="result">
        <div class="text-themeGreen mx-6 text-center">
          <button
            @click="togglePopup()"
            class="border-themeGreen float-right flex h-8 w-8 items-center justify-center self-end rounded-full border"
          >
            <X />
          </button>

          <h2 class="font-title self-center text-2xl font-bold">
            Room <span>{{ result?.room.name }}</span>
          </h2>
        </div>
        <ul class="ml-10 flex flex-col gap-2">
          <li>
            <label for="linens" class="flex gap-2">
              <input
                id="linens"
                type="checkbox"
                class="peer sr-only"
                v-model="cleaningInput.changeTheLinens"
                :disabled="result?.room.reservation?.cleaning.finish"
              />
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
              <input
                id="trash"
                type="checkbox"
                class="peer sr-only"
                v-model="cleaningInput.clearTheTrash"
                :disabled="result?.room.reservation?.cleaning.finish"
              />
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
              <input
                id="sufraces"
                type="checkbox"
                class="peer sr-only"
                v-model="cleaningInput.disinfectSurfaces"
                :disabled="result?.room.reservation?.cleaning.finish"
              />
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
              <input
                id="bathroom"
                type="checkbox"
                class="peer sr-only"
                v-model="cleaningInput.cleanTheBathroom"
                :disabled="result?.room.reservation?.cleaning.finish"
              />
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
              <input
                id="vacuumFloors"
                type="checkbox"
                class="peer sr-only"
                v-model="cleaningInput.vacuumTheFloor"
                :disabled="result?.room.reservation?.cleaning.finish"
              />
              <div
                class="peer-checked:bg-themeOffWhite border-themeBrown h-6 w-6 rounded-md border bg-white shadow-inner"
              ></div>
              <div
                class="text-themeBrown invisible absolute flex h-6 w-6 items-center justify-center peer-checked:visible"
              >
                <Check size="20" />
              </div>
              Vacuum the floor
            </label>
          </li>
          <li>
            <label for="mopFloors" class="flex gap-2">
              <input
                id="mopFloors"
                type="checkbox"
                class="peer sr-only"
                v-model="cleaningInput.mopTheFloor"
                :disabled="result?.room.reservation?.cleaning.finish"
              />
              <div
                class="peer-checked:bg-themeOffWhite border-themeBrown h-6 w-6 rounded-md border bg-white shadow-inner"
              ></div>
              <div
                class="text-themeBrown invisible absolute flex h-6 w-6 items-center justify-center peer-checked:visible"
              >
                <Check size="20" />
              </div>
              Mop the floor
            </label>
          </li>
        </ul>
        <div>
          <p
            class="text-center text-sm text-neutral-500"
            v-if="result?.room.reservation?.cleaning.finish === true"
          >
            Room cleaned by
            {{ result?.room.reservation?.cleaning.cleanedBy.firstName }}
            {{ result?.room.reservation?.cleaning.cleanedBy.lastName }}
          </p>
          <p v-else></p>
          <button
            v-if="
              cleaningInput.changeTheLinens === true &&
              cleaningInput.clearTheTrash === true &&
              cleaningInput.disinfectSurfaces === true &&
              cleaningInput.cleanTheBathroom === true &&
              cleaningInput.vacuumTheFloor === true &&
              cleaningInput.mopTheFloor === true
            "
            @click=";[finishCleaning()]"
            :disabled="result?.room.reservation?.cleaning.finish"
            :class="
              result?.room.reservation?.cleaning.finish === true
                ? 'opacity-50'
                : ''
            "
            class="border-themeBrown bg-themeOffWhite text-themeBrown focus:ring-themeBrown hover:bg-themeBrown m-auto mb-6 flex items-center rounded-md border px-6 py-2 text-sm hover:bg-opacity-20 focus:outline-none focus:ring"
          >
            MARK AS CLEANED
          </button>
          <button
            v-else
            @click=";[submitCleaning()]"
            class="border-themeBrown bg-themeOffWhite text-themeBrown focus:ring-themeBrown hover:bg-themeBrown m-auto mb-6 flex items-center rounded-md border px-6 py-2 text-sm hover:bg-opacity-20 focus:outline-none focus:ring"
          >
            CONFIRM
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
    class="bg-themeBrown fixed top-1/2 left-1/2 z-20 m-2 h-96 w-2/3 -translate-x-1/2 -translate-y-1/2 transform rounded-lg pt-6 text-lg shadow-lg md:h-96 md:w-2/5"
  ></div>
</template>

<script lang="ts">
import { useMutation, useQuery } from '@vue/apollo-composable'
import { reactive, watch } from 'vue'
import { Check, X, Frown } from 'lucide-vue-next'
import { ROOM_BY_ID } from '../../graphql/query.room'
import { UPDATE_CLEANING } from '../../graphql/mutation.cleaning'
import { GET_USER_BY_UID } from '../../graphql/query.user'
import Room from '../../interfaces/interface.room'
import useAuthentication from '../../composables/useAuthentication'

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
  setup(props) {
    const { user } = useAuthentication()
    const cleaningInput = reactive({
      id: '',
      changeTheLinens: false,
      clearTheTrash: false,
      disinfectSurfaces: false,
      cleanTheBathroom: false,
      vacuumTheFloor: false,
      mopTheFloor: false,
      finish: false,
      cleanedById: '',
    })
    const { result, loading, error, refetch } = useQuery<{ room: Room }>(
      ROOM_BY_ID,
      {
        id: props.id,
      },
    )

    watch(result, () => {
      console.log(result)
      const r = result.value!.room.reservation!.cleaning
      cleaningInput.id = r.cleaningId
      cleaningInput.changeTheLinens = r.changeTheLinens
      cleaningInput.clearTheTrash = r.clearTheTrash
      cleaningInput.disinfectSurfaces = r.disinfectSurfaces
      cleaningInput.cleanTheBathroom = r.cleanTheBathroom
      cleaningInput.vacuumTheFloor = r.vacuumTheFloor
      cleaningInput.mopTheFloor = r.mopTheFloor
    })

    const { mutate: updateCleaning } = useMutation(UPDATE_CLEANING, () => ({
      variables: {
        updateCleaningInput: cleaningInput,
      },
    }))

    const submitCleaning = async () => {
      console.log(cleaningInput)
      await updateCleaning()
        .then(() => {
          refetch()
        })
        .catch((err) => {
          console.log(err)
        })
    }

    const finishCleaning = async () => {
      cleaningInput.finish = true
      cleaningInput.cleanedById = user.value!.uid
      console.log(cleaningInput)
      await updateCleaning()
        .then(() => {
          refetch()
        })
        .catch((err) => {
          console.log(err)
        })
    }

    return {
      result,
      loading,
      error,
      cleaningInput,
      user,
      submitCleaning,
      finishCleaning,
    }
  },
  components: { Check, X, Frown },
}
</script>
