<template>
  <section>
    <div v-if="result" class="pt-3 md:pt-0 md:pl-6">
      <div
        class="absolute z-20 flex h-80 w-80 flex-col justify-between rounded-md bg-white p-6 lg:h-96 lg:w-96"
      >
        <div>
          <div class="flex items-center gap-4 pb-6">
            <div
              v-if="result.requestedService.user.imgUrl === ''"
              class="bg-themeGreen flex h-14 w-14 items-center justify-center rounded-full"
            >
              <p class="font-title text-lg text-white">
                {{ result.requestedService.user.firstName[0]
                }}{{ result.requestedService.user.lastName[0] }}
              </p>
            </div>
            <img
              v-else
              class="flex h-14 w-14 items-center justify-center rounded-full object-cover"
              :src="result.requestedService.user.imgUrl"
              :alt="`Picture of ${result.requestedService.user.firstName}`"
            />
            <h2 class="font-title text-lg">
              {{ result.requestedService.user.firstName }}
              {{ result.requestedService.user.lastName }}
            </h2>
          </div>
          <p>
            <span>{{ result.requestedService.service.name }}</span> asked on
            <span>{{
              new Date(
                result.requestedService.requestedDate,
              ).toLocaleDateString()
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
          v-if="result.requestedService.resolved === false"
          @click="markAsResolved()"
          class="border-themeBrown bg-themeOffWhite text-themeBrown focus:ring-themeBrown hover:bg-themeBrown rounded-md border px-6 py-2 text-sm hover:bg-opacity-20 focus:outline-none focus:ring"
        >
          <div v-if="!load">MARK AS RESOLVED</div>
          <div v-else>
            <Loader2 class="animate-spin" />
          </div>
        </button>
        <div class="flex flex-col" v-else>
          <p class="text-center text-sm text-neutral-500">
            Service resolved at
            {{
              new Date(
                result.requestedService.resolvedDate,
              ).toLocaleDateString()
            }}
            {{
              new Date(
                result.requestedService.resolvedDate,
              ).toLocaleTimeString()
            }}
          </p>
          <button
            @click="markAsResolved()"
            disabled
            class="border-themeBrown bg-themeOffWhite text-themeBrown focus:ring-themeBrown rounded-md border px-6 py-2 text-sm opacity-50 focus:outline-none focus:ring"
          >
            MARK AS RESOLVED
          </button>
        </div>
      </div>
      <div
        class="bg-themeBrown absolute z-10 m-2 h-80 w-80 rounded-md shadow-md lg:h-96 lg:w-96"
      ></div>
    </div>
    <div v-else class="absolute pl-6">
      <div class="ml-6 flex h-full w-full flex-col items-center justify-center">
        <ChooseServiceSvg class="h-36 w-36 md:h-56 md:w-56" />
        <h1 class="font-title text-xl text-neutral-500">Pick a service</h1>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { useMutation, useQuery } from '@vue/apollo-composable'
import { reactive, ref, watch } from 'vue'
import { UPDATE_REQUESTED_SERVICE } from '../../graphql/mutation.requestedService'
import {
  GET_REQUESTED_SERVICE,
  GET_REQUESTED_SERVICES,
  GET_UNRESOLVED_SERVICES,
} from '../../graphql/query.requestedService'
import { Loader2 } from 'lucide-vue-next'
import ChooseServiceSvg from '../../assets/svg/ChooseServiceSvg.vue'
import { userInfo } from 'os'

export default {
  components: {
    Loader2,
    ChooseServiceSvg,
  },
  props: {
    id: {
      type: String as () => string,
      required: true,
    },
  },
  setup(props) {
    const id = ref<string>(props.id)
    const load = ref<boolean>(false)
    const errorMessage = ref<string>('')
    const successMessage = ref<string>('')

    const serviceInput = reactive({
      id: id,
      userId: '',
      serviceId: '',
      message: '',
      requestedDate: new Date(),
      resolvedDate: new Date(),
      resolved: true,
    })

    const { result, loading, error, refetch } = useQuery(
      GET_REQUESTED_SERVICE,
      {
        id: id,
      },
    )
    watch(result, () => {
      console.log(result)
      serviceInput.userId = result.value.requestedService.user.uid
      serviceInput.serviceId = result.value.requestedService.service.id
      serviceInput.message = result.value.requestedService.message
      serviceInput.requestedDate = result.value.requestedService.requestedDate
    })

    const {
      result: resultServices,
      loading: loadingServices,
      error: errorServices,
    } = useQuery(GET_REQUESTED_SERVICES, {
      id: id,
    })

    const {
      result: resultUnServices,
      loading: loadingUnServices,
      error: errorUnServices,
    } = useQuery(GET_UNRESOLVED_SERVICES, {
      id: id,
    })

    const { mutate: updateRequestedService } = useMutation(
      UPDATE_REQUESTED_SERVICE,
      () => ({
        variables: {
          updateRequestedServiceInput: serviceInput,
        },
        update(cache, { data: { updateRequestedService } }) {
          let data: any = cache.readQuery({
            query: GET_REQUESTED_SERVICES,
          })
          let dataUn: any = cache.readQuery({
            query: GET_UNRESOLVED_SERVICES,
          })
          cache.writeQuery({
            query: GET_REQUESTED_SERVICES,
            data: {
              requestedServices: [
                ...data.requestedServices,
                updateRequestedService,
              ],
            },
          })
          cache.writeQuery({
            query: GET_UNRESOLVED_SERVICES,
            data: {
              unresolvedRequestedServices:
                dataUn.unresolvedRequestedServices.filter(
                  (service: any) => service.id !== updateRequestedService.id,
                ),
            },
          })
        },
      }),
    )

    const markAsResolved = async () => {
      load.value = true
      await updateRequestedService()
        .catch((err) => {
          errorMessage.value = err.message
        })
        .finally(() => {
          load.value = false
        })
    }

    watch(props, async () => {
      if (props.id !== '') {
        id.value = props.id
        await refetch()
      }
    })
    return { result, loading, error, load, markAsResolved }
  },
}
</script>
