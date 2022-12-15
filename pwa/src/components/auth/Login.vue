<template>
  <div>
    <form @submit.prevent="submitForm">
      <header>
        <h2 class="text-themeGreen font-title mb-3 text-4xl font-bold">
          Login
        </h2>
      </header>

      <div
        v-if="errorMessage"
        class="mb-3 flex items-center justify-between rounded-md bg-red-100 px-3 py-1"
      >
        <p class="text-sm text-red-600">{{ errorMessage }}</p>

        <button
          class="rounded-full p-3 ring-red-600 hover:bg-red-200 focus:outline-none focus:ring-2"
          @click="errorMessage = ''"
        >
          <X class="h-4 w-4 text-red-600" />
        </button>
      </div>

      <!-- EMAIL -->
      <div class="mt-3">
        <label
          class="focus-within:text-themeGreen mb-1 block text-neutral-500"
          for="email"
        >
          <span class="font-title mb-2 block">Email</span>
          <input
            type="email"
            id="email"
            name="email"
            class="border-themeBrown ring-themeBrown w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none ring-neutral-300 focus-visible:ring"
            autocomplete="email"
            v-model="userInput.email"
          />
        </label>
      </div>

      <!-- PASSWORD -->
      <div class="mt-3">
        <label
          class="focus-within:text-themeGreen mb-1 block text-neutral-500"
          for="password"
        >
          <span class="font-title mb-2 block">Password</span>
          <input
            v-model="userInput.password"
            type="password"
            id="password"
            name="password"
            class="border-themeBrown ring-themeBrown w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none ring-neutral-300 focus-visible:ring"
            autocomplete="current-password"
          />
        </label>
      </div>

      <button
        class="border-themeBrown bg-themeOffWhite text-themeBrown focus:ring-themeBrown hover:bg-themeBrown mt-6 flex w-full items-center justify-center rounded-md border px-6 py-2 text-sm hover:bg-opacity-20 focus:outline-none focus:ring"
        :disabled="loading"
      >
        <span v-if="!loading"> Login </span>
        <div v-else>
          <Loader2 class="animate-spin" />
        </div>
      </button>

      <p class="mt-3 text-center text-sm">
        <RouterLink
          to="/auth/register"
          class="rounded-md outline-none ring-neutral-300 hover:underline focus-visible:ring"
        >
          Don't have an account yet?
        </RouterLink>
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, Ref, ref } from 'vue'
import { useRouter } from 'vue-router'

import { X, Loader2 } from 'lucide-vue-next'

import useAuthentication from '../../composables/useAuthentication'
import useCustomUser from '../../composables/useCustomUser'

const { login } = useAuthentication()
const { replace } = useRouter()
const { customUser, loadCustomUser } = useCustomUser()

const errorMessage: Ref<string> = ref('')
const loading: Ref<boolean> = ref(false)

const userInput = reactive({
  email: '',
  password: '',
})

const submitForm = () => {
  if (userInput.email === '' || userInput.password === '') {
    errorMessage.value = 'Please fill in all fields.'
  }
  customUser.value = null
  console.log('customUser.value', customUser.value)

  login(userInput.email, userInput.password)
    .then(async (u) => {
      if (u) await loadCustomUser()
      console.log('customUser.value', customUser.value)
      if (customUser.value?.role.name === 'admin') {
        return replace('/admin')
      }
      replace('/')
    })
    .catch((error) => (errorMessage.value = error.message))
    .finally(() => {
      loading.value = false
    })
}
</script>
