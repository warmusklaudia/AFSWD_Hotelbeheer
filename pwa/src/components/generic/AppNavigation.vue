<template>
    <ul
        class="grid w-full md:gap-3 font-title font-bold grid-cols-5 items-center text-center text-[11px] sm:w-auto sm:space-x-3 sm:text-left sm:text-sm ">
        <li>
            <router-link class="inline-block rounded-sm py-6 outline-none focus-visible:ring-2 ring-themeBrown" to="/"
                exact-active-class="opacity-60">
                <Home class="mx-auto mb-2 h-5 sm:hidden" />
                <p>{{ $t('navigation.home') }}</p>
            </router-link>
        </li>
        <li>
            <router-link class="inline-block rounded-sm py-6 outline-none focus-visible:ring-2 ring-themeBrown"
                to="/rooms" active-class="opacity-60">
                <Bed class="mx-auto mb-2 h-5 sm:hidden" />
                <p>{{ $t('navigation.rooms') }}</p>
            </router-link>
        </li>
        <li>
            <router-link class="inline-block rounded-sm py-6 outline-none focus-visible:ring-2 ring-themeBrown"
                to="/services" active-class="opacity-60">
                <ConciergeBell class="mx-auto mb-2 h-5 sm:hidden" />
                <p>{{ $t('navigation.services') }}</p>
            </router-link>
        </li>
        <li>
            <router-link class="inline-block rounded-sm py-6 outline-none focus-visible:ring-2 ring-themeBrown"
                to="/reservations" active-class="opacity-60">
                <Clipboard class="mx-auto mb-2 h-5 sm:hidden" />
                <p>{{ $t('navigation.reservations') }}</p>
            </router-link>
        </li>
        <li>
            <router-link class="inline-block rounded-sm py-6 outline-none focus-visible:ring-2 sm:hidden" to="/profile"
                active-class="opacity-60">
                <Scroll class="mx-auto mb-2 h-5" />
                <p>{{ $t('navigation.user') }}</p>
            </router-link>
        </li>

        <li class="hidden sm:block ">
            <router-link v-if="user" class="rounded-sm py-6 outline-none focus-visible:ring-2 ring-themeBrown"
                to="/profile">
                {{ user.displayName }}
            </router-link>
            <router-link v-else class="rounded-sm py-6 outline-none focus-visible:ring-2 ring-themeBrown"
                to="/auth/login">Login
            </router-link>
        </li>
        <li class="hidden sm:block">
            <ul class="flex items-center">
                <li v-if="user" class="px-3">$ {{ customUser?.amountCredits == null ? 10.00 : customUser?.amountCredits.toFixed(2) }}</li>
                <li class="px-3 ">
                    <select name="" id=""
                        class="bg-transparent rounded-sm py-6 outline-none focus-visible:ring-2 cursor-pointer ring-themeBrown"
                        @change="setLocale">
                        <option v-for="locale of AVAILABLE_LOCALES" :value="locale"
                            :selected="locale === i18n.global.locale">
                            {{ locale }}
                        </option>
                    </select>
                </li>
            </ul>
        </li>

    </ul>
</template>

<script setup lang="ts">
import { Home, Bed, Clipboard, Scroll, ConciergeBell } from 'lucide-vue-next'

import useI18n from "../../composables/useI18n";
import useAuthentication from '../../composables/useAuthentication'
import useCustomUser from "../../composables/useCustomUser";


const { loadLocale, AVAILABLE_LOCALES, i18n } = useI18n()

const setLocale = (event: Event) => {
    const target = event?.target as HTMLSelectElement
    loadLocale(target.value)
}

const { user } = useAuthentication()
const { customUser } = useCustomUser()

console.log(customUser)

</script>