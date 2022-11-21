<template>
    <RouteHolder title="Add service">
        <div class="grid md:grid-cols-2 gap-12">
            <div v-if="loading" class="grid animate-pulse gap-6">
                <div v-for="i of skeletons" :key="i" class="flex gap-3">
                    <div class="@dark:bg-neutral-700 aspect-square rounded-md bg-neutral-300"></div>
                    <div>
                        <p class="@dark:bg-neutral-600 my-1 h-6 w-36 rounded bg-neutral-200"></p>
                        <p class="@dark:bg-neutral-600 my-1 h-6 w-36 rounded bg-neutral-200"></p>
                        <p class="@dark:bg-neutral-600 my-1 h-6 w-36 rounded bg-neutral-200"></p>
                        <p class="@dark:bg-neutral-600 my-2 h-6 w-12 rounded bg-neutral-100"></p>
                    </div>
                </div>
            </div>
            <div v-else-if="error">
                <p>Error happened.</p>
            </div>
            <div v-else-if="result">
                <ul class="flex flex-col gap-3">
                    <li v-for="s of result.services">
                        <h2 class="font-title font-bold text-2xl mb-3">{{ s.name }}</h2>
                        <div class="grid md:grid-cols-[auto_1fr] gap-6">
                            <img class="@dark:bg-neutral-700 aspect-square block object-cover max-h-48 rounded-md bg-neutral-300"
                                src="https://images.pexels.com/photos/5371575/pexels-photo-5371575.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                            <div class="grid grid-rows-[1fr_auto] gap-3">
                                <p class="font-theme">{{ s.description }}</p>
                                <p class="text-lg">Price: € {{ s.price }}</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <form @submit.prevent="">
                <div class="flex flex-col gap-3">
                    <div>
                        <label :class="serviceErrors.serviceId ? 'text-red-600' : ''"
                            class="block text-neutral-400 focus-within:text-neutral-900">
                            <span class="font-title font-bold">Services</span>
                            <div>
                                <select v-if="result" :class="
                                    serviceErrors.serviceId
                                        ? 'border-red-500 text-red-600 ring ring-red-600'
                                        : 'ring - themeBrown'
                                " class="mr-3 mt-3 rounded-md border font-theme font-light border-neutral-200 px-3 py-1 text-neutral-800 outline-none focus-visible:ring"
                                    name="serviceId" id="serviceId" @change="handleServiceChange" v-model="service"
                                    :disabled="loading">
                                    <option :value="{}" selected disabled>Pick a service</option>
                                    <option v-for="s of result.services" :key="s.id" :value="s">
                                        {{ s.name }}
                                    </option>
                                </select>
                            </div>
                        </label>
                        <div v-if="serviceErrors.serviceId != ''"
                            class="text-red-600 bg-red-100 border-1 border-red-600 rounded-sm text-sm p-1 mt-2 flex items-center gap-2">
                            <AlertTriangle />
                            <p>{{ serviceErrors.serviceId }}</p>
                        </div>
                    </div>
                    <div>
                        <label class="mb-1 block text-neutral-500 focus-within:text-neutral-900" for="date">
                            <span class="font-title font-bold mb-2 block">Date</span>

                            <input id="date" :class="
                                serviceErrors.requestedDate
                                    ? 'border-red-500 text-red-600 ring ring-red-600'
                                    : 'ring-themeBrown'
                            " class="w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none focus-visible:ring"
                                type="date" name="date" v-model="serviceInput.requestedDate"
                                :min="new Date().toISOString().slice(0, 10)" />
                        </label>
                        <div v-if="serviceErrors.requestedDate != ''"
                            class="text-red-600 bg-red-100 border-1 border-red-600 rounded-sm text-sm p-1 mt-2 flex items-center gap-2">
                            <AlertTriangle />
                            <p>{{ serviceErrors.requestedDate }}</p>
                        </div>
                    </div>
                    <div>
                        <label class="mb-1 block text-neutral-400 focus-within:text-neutral-900" for="message">
                            <span class="mb-2 block font-title font-bold">Add message</span>

                            <textarea
                                class="w-full resize-none rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none ring-themeBrown focus-visible:ring"
                                v-model="serviceInput.message" name="message" id="message" rows="10"></textarea>
                        </label>
                    </div>
                    <button class="rounded-md bg-themeOffWhite px-4 py-2 text-themeBrown border border-themeBrown"
                        @click="submitForm">Submit</button>
                </div>
            </form>
        </div>


    </RouteHolder>
</template>

<script setup lang="ts">
import { useMutation, useQuery } from "@vue/apollo-composable";
import { reactive, ref } from "vue";
import { AlertTriangle } from "lucide-vue-next"
import { useRouter } from "vue-router";

import RouteHolder from '../../components/holders/RouteHolder.vue'
import Service from '../../interfaces/interface.service'
import { GET_SERVICES } from "../../graphql/query.service";
import { ADD_REQUESTED_SERVICE } from "../../graphql/mutation.requestedService";
import useAuthentication from "../../composables/useAuthentication";

const { push } = useRouter()
const { user } = useAuthentication()
const errorMessage = ref('')
const { result, loading, error } = useQuery(GET_SERVICES)

const skeletons = ref(3)
const service = ref({} as Service)

const serviceErrors = reactive({
    serviceId: '',
    requestedDate: ''
})

const serviceInput = reactive({
    serviceId: service.value.id,
    userId: user.value!.uid,
    requestedDate: '',
    message: '',
})

const handleServiceChange = () => {
    if (!service.value) return

    console.log(service.value)
    serviceInput.serviceId = service.value.id
}

const IsFormValid = (): boolean => {
    let hasSomeErrors = false

    if (!serviceInput.serviceId) {
        serviceErrors.serviceId = 'Please choose a service'
        hasSomeErrors = true
    } else {
        serviceErrors.serviceId = ''
    }

    if (serviceInput.requestedDate === '') {
        serviceErrors.requestedDate = 'Please enter a date'
        hasSomeErrors = true
    } else {
        serviceErrors.requestedDate = ''
    }

    if (hasSomeErrors) return true
    return false
}

const { mutate: addRequestedService } = useMutation(ADD_REQUESTED_SERVICE, () => ({
    variables: {
        createRequestedServiceInput: serviceInput,
    },
}))

const submitForm = async () => {
    if (IsFormValid()) return

    const service = await addRequestedService().catch((err) => {
        errorMessage.value = err.message
    })

    if (service) {
        push('/services')
    }
}
</script>