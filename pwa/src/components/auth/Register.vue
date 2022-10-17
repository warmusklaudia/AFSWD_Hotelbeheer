<template>
    <div>
        <form @submit.prevent="submitForm">
            <header>
                <h2 class="text-themeGreen font-title font-bold text-4xl mb-3">Registration</h2>
            </header>

            <div v-if="errorMessage" class="mb-3 flex items-center justify-between rounded-md bg-red-100 px-3 py-1">
                <p class="text-sm text-red-600">{{ errorMessage }}</p>

                <button class="rounded-full p-3 ring-red-600 hover:bg-red-200 focus:outline-none focus:ring-2"
                    @click="errorMessage = ''">
                    <X class="h-4 w-4 text-red-600" />
                </button>
            </div>

            <!-- NAME -->
            <div class="mt-3">
                <label class="mb-1 block text-neutral-500 focus-within:text-themeGreen" for="name">
                    <span class="mb-2 block font-title">Name</span>
                    <input v-model="userInput.name" type="text" id="name" name="name"
                        class="w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none ring-neutral-300 focus-visible:ring" />
                </label>
            </div>

            <!-- EMAIL -->
            <div class="mt-3">
                <label class="mb-1 block text-neutral-500 focus-within:text-themeGreen" for="email">
                    <span class="mb-2 block font-title">Email</span>
                    <input type="email" id="email" name="email"
                        class="w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none ring-neutral-300 focus-visible:ring"
                        autocomplete="email" v-model="userInput.email" />
                </label>
            </div>

            <!-- PASSWORD -->
            <div class="mt-3">
                <label class="mb-1 block text-neutral-500 focus-within:text-themeGreen" for="password">
                    <span class="mb-2 block  font-title">Password</span>
                    <input v-model="userInput.password" type="password" id="password" name="password"
                        class="w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none ring-neutral-300 focus-visible:ring"
                        autocomplete="current-password" />
                </label>
            </div>

            <button
                class=":disabled='loading' mt-6 flex w-full items-center justify-center rounded-md bg-themeBrown py-2 px-3 text-white outline-none ring-neutral-300 hover:bg-neutral-700 focus-visible:ring">
                <span v-if="!loading"> Create account </span>
                <div v-else>
                    <Loader2 class="animate-spin" />
                </div>
            </button>

            <p class="mt-3 text-center text-sm">
                <RouterLink to="/auth/login"
                    class="rounded-md outline-none ring-neutral-300 hover:underline focus-visible:ring">
                    Already have an account?
                </RouterLink>
            </p>

        </form>
    </div>
</template>

<script setup lang="ts">
import { reactive, Ref, ref } from "vue";
import { useRouter } from "vue-router";

import { X, Loader2 } from 'lucide-vue-next'

import useAuthentication from "../../composables/useAuthentication";

const { register } = useAuthentication()
const { replace } = useRouter()

const errorMessage: Ref<string> = ref('')
const loading: Ref<boolean> = ref(false)

const userInput = reactive({
    name: '',
    email: '',
    password: '',
})

const submitForm = () => {
    if (
        userInput.email === '' ||
        userInput.password === '' ||
        userInput.name === ''
    ) {
        errorMessage.value = 'Please fill in all fields.'
    }

    register(userInput.name, userInput.email, userInput.password)
        .then((u) => {
            replace('auth/login')
        })
        .catch((error) => (errorMessage.value = error.message))
        .finally(() => {
            loading.value = false
        })
}

</script>