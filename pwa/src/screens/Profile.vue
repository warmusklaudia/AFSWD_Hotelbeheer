<template>
    <RouteHolder title="Profile">
        <template #header-actions>
            <button @click="handleLogOut"
                class="rounded-md bg-themeOffWhite px-4 py-2 text-themeBrown border border-themeBrown">{{
                        $t('account.log.out')
                }}</button>
        </template>
        <div class="flex flex-col gap-6">
            <div class="flex flex-col gap-3">
                <h3 class="font-title font-bold text-2xl">
                    Rooms
                </h3>
                <div v-if="loading"></div>
                <div v-else-if="error"></div>
                <div v-else-if="result" class="flex gap-10 overflow-x-auto max-w-[80vw]">
                    <ul :key="r.id" v-for="r in result.findReservationsByUserId" class="flex gap-10">
                        <li :key="room.id" v-for="room in r.rooms" class="flex flex-col items-center gap-3">
                            <qrcode-vue :value="room.accessCode" :size="size" level="H" />
                            <h4 class="font-title font-bold text-lg">{{ room.name }}</h4>
                        </li>
                    </ul>
                </div>

            </div>
            <div class="flex flex-col gap-3" v-if="customUser?.breakfastCode">
                <h3 class="font-title font-bold text-2xl">
                    Breakfast
                </h3>
                <div>
                    <qrcode-vue :value="value" :size="size" level="H" />
                </div>
            </div>
            <div>
                <h3 class="font-title font-bold text-2xl">Credits</h3>
                <div class="flex flex-col gap-3 max-w-xs">
                    <label class="mb-1 block text-neutral-500 focus-within:text-neutral-900"
                        :class="errorMessage ? 'focus-within:text-red-600' : ''" for="amountAdults">
                        <span class="font-title mb-2 block" :class="errorMessage ? 'text-red-600' : ''">
                            Add amount
                        </span>
                        <input id="amountAdults"
                            class="ring-themeBrown w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none focus-visible:ring"
                            :class="errorMessage ? 'border-red-500 text-red-600 ring-red-400' : ''" type="number"
                            name="amountAdults" v-model="amountCredits" min="0" step="5" />
                    </label>
                    <button class="rounded-md bg-themeOffWhite px-4 py-2 text-themeBrown border border-themeBrown"
                        @click="addCredits">
                        Add credits
                    </button>
                </div>
            </div>
        </div>
    </RouteHolder>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import QrcodeVue from 'qrcode.vue'

import RouteHolder from '../components/holders/RouteHolder.vue'
import useAuthentication from "../composables/useAuthentication";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { GET_RESERVATIONS_WITH_ROOMS_BY_USER_ID } from "../graphql/query.reservation";
import { ref } from "vue";
import { ADD_CREDITS_TO_USER } from "../graphql/mutation.user";
import useCustomUser from "../composables/useCustomUser";
import { GET_CURRENT_USER } from "../graphql/query.user";

const { logout, user } = useAuthentication()
const { customUser, loadCustomUser } = useCustomUser()
const { replace } = useRouter()

const amountCredits = ref(0)
const errorMessage = ref('')
const value = 'https://example.com'
const size = 150

console.log(customUser.value)

const { result, loading, error } = useQuery(GET_RESERVATIONS_WITH_ROOMS_BY_USER_ID, () => ({
    uid: user.value?.uid!
}))

const { result: resultUser, loading: loadingUser, error: errUser } = useQuery(GET_CURRENT_USER)

const { mutate: addCreditsToUser } = useMutation(ADD_CREDITS_TO_USER, () => ({
    variables: {
        id: customUser.value?.id, //id of uid gebruiken? 
        amount: amountCredits.value
    },
    update(cache, { data: { addCreditsToUser } }) {
        let data: any = cache.readQuery(
            { query: GET_CURRENT_USER }
        )
        cache.writeQuery({
            query: GET_CURRENT_USER,
            data: {
                findByCurrentUserUid: addCreditsToUser
            }
        })
    }
}))

const getToken = async () => {
    console.log(
        `{ "authorization": "Bearer ${await user.value?.getIdToken()}" }`,
    )
}

const creditValidation = () => {
    let hasSomeErrors = false

    if (amountCredits.value === 0) {
        errorMessage.value = 'Please enter a valid amount'
        hasSomeErrors = true
    } else {
        errorMessage.value = ''
    }

    if (hasSomeErrors) return true
    return false
}

const addCredits = async () => {
    if (creditValidation()) return
    console.log(resultUser)

    const room = await addCreditsToUser().catch((err) => {
        errorMessage.value = err.message
        console.log(err)
    })

    loadCustomUser()
}

const handleLogOut = () => {
    logout().then(() => {
        replace('auth/login')
    })
}

getToken()
</script>