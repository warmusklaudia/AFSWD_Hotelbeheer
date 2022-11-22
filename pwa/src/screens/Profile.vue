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
                <div class=" overflow-x-auto max-w-[80vw]">
                    <ul class="flex gap-10">
                        <li class="flex flex-col items-center">
                            <qrcode-vue :value="value" :size="size" level="H" />
                            <h4 class="font-title font-bold text-lg">room</h4>
                        </li>
                        <li class="flex flex-col items-center">
                            <qrcode-vue :value="value" :size="size" level="H" />
                            <h4 class="font-title font-bold text-lg">room</h4>
                        </li>
                        <li class="flex flex-col items-center">
                            <qrcode-vue :value="value" :size="size" level="H" />
                            <h4 class="font-title font-bold text-lg">room</h4>
                        </li>
                    </ul>
                </div>

            </div>
            <div class="flex flex-col gap-3">
                <h3 class="font-title font-bold text-2xl">
                    Breakfast
                </h3>
                <div>
                    <qrcode-vue :value="value" :size="size" level="H" />
                </div>
            </div>
            <div>
                <h3 class="font-title font-bold text-2xl">Credits</h3>
                <div class="grid grid-cols-[auto_auto_1fr]">
                    <label class="mb-1 block text-neutral-500 focus-within:text-neutral-900"
                        :class="true ? 'focus-within:text-red-600' : ''" for="amountAdults">
                        <span class="font-title mb-2 block" :class="true ? 'text-red-600' : ''">
                            Add amount
                        </span>
                        <input id="amountAdults"
                            class="ring-themeBrown w-full rounded-md border border-neutral-200 px-3 py-1 text-neutral-800 outline-none focus-visible:ring"
                            :class="true ? 'border-red-500 text-red-600 ring-red-400' : ''" type="number"
                            name="amountAdults" @input="" min="0" :value="1" step="5" />
                    </label>
                    <button>test</button>
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

const { logout } = useAuthentication()
const { replace } = useRouter()

const value = 'https://example.com'
const size = 200

const handleLogOut = () => {
    logout().then(() => {
        replace('auth/login')
    })
}
</script>