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
                    <li>
                        <h2 class="font-title font-bold mb-2">Title</h2>
                        <div class="grid md:grid-cols-[auto_1fr] gap-3">
                            <img class="@dark:bg-neutral-700 aspect-square block object-cover max-h-48 rounded-md bg-neutral-300"
                                src="https://images.pexels.com/photos/5371575/pexels-photo-5371575.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                            <div>
                                <p class="">description</p>
                                <p class="">price</p>
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
                                    name="serviceId" id="serviceId" @change="" :disabled="loading">
                                    <option :value="{}" selected disabled>Pick a service</option>
                                    <option v-for="l of result.locations" :key="l.id" :value="l">
                                        {{ l.name }}
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
                                serviceErrors.date
                                    ? 'border-red-500 text-red-600 ring ring-red-600'
                                    : 'ring-themeBrown'
                            " class="w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none focus-visible:ring"
                                type="date" name="date" v-model="serviceInput.date"
                                :min="new Date().toISOString().slice(0, 10)" />
                        </label>
                        <div v-if="serviceErrors.date != ''"
                            class="text-red-600 bg-red-100 border-1 border-red-600 rounded-sm text-sm p-1 mt-2 flex items-center gap-2">
                            <AlertTriangle />
                            <p>{{ serviceErrors.date }}</p>
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
import { useQuery } from "@vue/apollo-composable";
import { reactive, ref } from "vue";
import { AlertTriangle } from "lucide-vue-next"
import { useRouter } from "vue-router";

import RouteHolder from '../../components/holders/RouteHolder.vue'

import { GET_RESERVATIONS } from "../../graphql/query.reservation";

const { push } = useRouter()
const { result, loading, error } = useQuery(GET_RESERVATIONS)

const skeletons = ref(3)

const serviceErrors = reactive({
    serviceId: '',
    date: ''
})

const serviceInput = reactive({
    serviceId: '',
    date: '',
    message: '',
})

const IsFormValid = (): boolean => {
    let hasSomeErrors = false

    if (serviceInput.serviceId === '') {
        serviceErrors.serviceId = 'Please choose a service'
        hasSomeErrors = true
    } else {
        serviceErrors.date = ''
    }

    if (serviceInput.date === '') {
        serviceErrors.date = 'Please enter a date'
        hasSomeErrors = true
    } else {
        serviceErrors.date = ''
    }

    if (hasSomeErrors) return true
    return false
}

const submitForm = async () => {
    if (IsFormValid()) return

    console.log('click')
    // const service = await addReservation().catch((err) => {
    //     errorMessage.value = err.message
    // })
    push('/services')
}
</script>