<template>
  <div>
    <form @submit.prevent="submitForm">
      <header>
        <h2 class="text-themeGreen font-title mb-3 text-4xl font-bold">
          Registration
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

      <div class="mt-3 flex justify-between gap-3">
        <label
          class="focus-within:text-themeGreen mb-1 block text-neutral-500"
          :class="userErrors.firstName ? 'focus-within:text-red-600' : ''"
          for="firstName"
        >
          <span
            class="font-title mb-2 block"
            :class="userErrors.firstName ? 'text-red-600' : ''"
            >First name
            {{ userErrors.firstName ? `(${userErrors.firstName})` : '' }}</span
          >
          <input
            v-model="customUserInput.firstName"
            :class="
              userErrors.firstName
                ? ' border-red-800 ring-red-800'
                : 'border-themeBrown ring-themeBrown '
            "
            type="text"
            id="firstName"
            name="firstName"
            class="w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none ring-neutral-300 focus-visible:ring"
          />
        </label>
        <label
          class="focus-within:text-themeGreen mb-1 block text-neutral-500"
          :class="userErrors.lastName ? 'focus-within:text-red-600' : ''"
          for="lastName"
        >
          <span
            class="font-title mb-2 block"
            :class="userErrors.lastName ? 'text-red-600' : ''"
            >Last name
            {{ userErrors.lastName ? `(${userErrors.lastName})` : '' }}</span
          >
          <input
            v-model="customUserInput.lastName"
            :class="
              userErrors.lastName
                ? ' border-red-800 ring-red-800'
                : 'border-themeBrown ring-themeBrown '
            "
            type="text"
            id="lastName"
            name="lastName"
            class="w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none ring-neutral-300 focus-visible:ring"
          />
        </label>
      </div>
      <label
        class="mb-1 block text-neutral-500 focus-within:text-neutral-900"
        :class="userErrors.preferredLanguage ? 'focus-within:text-red-600' : ''"
        for="preferredLanguage"
      >
        <span
          class="mb-2 block"
          :class="userErrors.preferredLanguage ? 'text-red-600' : ''"
        >
          Preferred language
          {{
            userErrors.preferredLanguage
              ? `(${userErrors.preferredLanguage})`
              : ''
          }}
        </span>
        <select
          v-model="customUserInput.preferredLanguage"
          :class="
            userErrors.preferredLanguage
              ? ' border-red-800 ring-red-800'
              : 'border-themeBrown ring-themeBrown  '
          "
          id="preferredLanguage"
          class="w-full rounded-md border px-3 py-1 text-neutral-800 outline-none focus-visible:ring"
          name="preferredLanguage"
        >
          <option value="en">en</option>
          <option value="nl">nl</option>
          <option value="fr">fr</option>
        </select>
      </label>

      <div class="mt-3">
        <label
          class="focus-within:text-themeGreen mb-1 block text-neutral-500"
          :class="userErrors.email ? 'focus-within:text-red-600' : ''"
          for="email"
        >
          <span
            class="font-title mb-2 block"
            :class="userErrors.email ? 'text-red-600' : ''"
            >Email {{ userErrors.email ? `(${userErrors.email})` : '' }}</span
          >
          <input
            type="email"
            id="email"
            name="email"
            :class="
              userErrors.email
                ? ' border-red-800 ring-red-800'
                : 'border-themeBrown ring-themeBrown  '
            "
            class="w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none ring-neutral-300 focus-visible:ring"
            autocomplete="email"
            v-model="userInput.email"
          />
        </label>
      </div>

      <div class="mt-3">
        <label
          class="focus-within:text-themeGreen mb-1 block text-neutral-500"
          :class="userErrors.password ? 'focus-within:text-red-600' : ''"
          for="password"
        >
          <span
            class="font-title mb-2 block"
            :class="userErrors.password ? 'text-red-600' : ''"
            >Password
            {{ userErrors.password ? `(${userErrors.password})` : '' }}</span
          >
          <input
            v-model="userInput.password"
            type="password"
            id="password"
            name="password"
            :class="
              userErrors.password
                ? ' border-red-800 ring-red-800'
                : 'border-themeBrown ring-themeBrown  '
            "
            class="w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none ring-neutral-300 focus-visible:ring"
            autocomplete="current-password"
          />
        </label>
      </div>

      <button
        class="border-themeBrown bg-themeOffWhite text-themeBrown focus:ring-themeBrown hover:bg-themeBrown mt-6 flex w-full items-center justify-center rounded-md border px-6 py-2 text-sm hover:bg-opacity-20 focus:outline-none focus:ring"
        :disabled="loading"
      >
        <span v-if="!loading"> Create account </span>
        <div v-else>
          <Loader2 class="animate-spin" />
        </div>
      </button>

      <p class="mt-3 text-center text-sm">
        <RouterLink
          to="/auth/login"
          class="rounded-md outline-none ring-neutral-300 hover:underline focus-visible:ring"
        >
          Already have an account?
        </RouterLink>
      </p>
    </form>
  </div>
</template>

<script lang="ts">
import useAuthentication from '../../composables/useAuthentication'
import { reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { X, Loader2 } from 'lucide-vue-next'
import { ADD_USER } from '../../graphql/mutation.user'
import { useMutation } from '@vue/apollo-composable'

export default {
  components: {
    X,
    Loader2,
  },
  setup() {
    const { register } = useAuthentication()
    const { replace } = useRouter()

    const errorMessage = ref<string>('')
    const loading = ref<boolean>(false)

    const customUserInput = reactive({
      uid: '',
      firstName: '',
      lastName: '',
      preferredLanguage: '',
      imgUrl: '',
    })
    const userInput = reactive({
      email: '',
      password: '',
    })

    const userErrors = reactive({
      firstName: '',
      lastName: '',
      preferredLanguage: '',
      email: '',
      password: '',
    })

    const { mutate: createUser } = useMutation(ADD_USER, () => ({
      variables: {
        createUserInput: customUserInput,
      },
    }))
    const fullName = ref<string>(
      `${customUserInput.firstName} ${customUserInput.lastName}`,
    )

    const isFormInvalid = (): boolean => {
      let hasErrors: boolean = false
      if (customUserInput.firstName === '') {
        userErrors.firstName = 'Required'
        hasErrors = true
      } else {
        userErrors.firstName = ''
      }

      if (customUserInput.lastName === '') {
        userErrors.lastName = 'Required'
        hasErrors = true
      } else {
        userErrors.lastName = ''
      }

      if (customUserInput.preferredLanguage === '') {
        userErrors.preferredLanguage = 'Required'
        hasErrors = true
      } else {
        userErrors.preferredLanguage = ''
      }

      if (userInput.email === '') {
        userErrors.email = 'Required'
        hasErrors = true
      } else {
        userErrors.email = ''
      }

      if (userInput.password === '') {
        userErrors.password = 'Required'
        hasErrors = true
      } else {
        userErrors.password = ''
      }

      if (hasErrors) return true
      return false
    }

    watch(customUserInput, () => {
      fullName.value = `${customUserInput.firstName} ${customUserInput.lastName}`
    })
    const submitForm = async () => {
      if (isFormInvalid()) return
      loading.value = true
      register(fullName.value, userInput.email, userInput.password)
        .then((u) => {
          customUserInput.uid = u.value!.uid
          console.log(customUserInput)
          createUser()
          replace('/auth/login')
        })
        .catch((error) => (errorMessage.value = error.message))
        .finally(() => {
          loading.value = false
        })
    }
    return {
      submitForm,
      userInput,
      customUserInput,
      userErrors,
      loading,
      errorMessage,
    }
  },
}
</script>
