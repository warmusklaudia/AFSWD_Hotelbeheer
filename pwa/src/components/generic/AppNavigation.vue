<template>
    <ul
        class="grid w-full font-title font-bold grid-cols-5 items-center text-center text-xs sm:w-auto sm:space-x-3 sm:text-left sm:text-sm ">
        <li>
            <router-link class="inline-block rounded-sm px-3 py-6 outline-none focus-visible:ring-2" to="/"
                exact-active-class="opacity-60">
                <Home class="mx-auto mb-2 h-5 sm:hidden" />
                <p>Home</p>
            </router-link>
        </li>
        <li>
            <router-link class="inline-block rounded-sm px-3 py-6 outline-none focus-visible:ring-2" to="/rooms"
                active-class="opacity-60">
                <Bed class="mx-auto mb-2 h-5 sm:hidden" />
                <p>Rooms</p>
            </router-link>
        </li>
        <li>
            <router-link class="inline-block rounded-sm px-3 py-6 outline-none focus-visible:ring-2" to="/services"
                active-class="opacity-60">
                <ConciergeBell class="mx-auto mb-2 h-5 sm:hidden" />
                <p>Services</p>
            </router-link>
        </li>
        <li>
            <router-link class="inline-block rounded-sm px-3 py-6 outline-none focus-visible:ring-2" to="/reservations"
                active-class="opacity-60">
                <Clipboard class="mx-auto mb-2 h-5 sm:hidden" />
                <p>Reservations</p>
            </router-link>
        </li>
        <li>
            <router-link class="inline-block rounded-sm px-3 py-6 outline-none focus-visible:ring-2 sm:hidden"
                to="/profile" active-class="opacity-60">
                <Scroll class="mx-auto mb-2 h-5" />
                <p>User</p>
            </router-link>
        </li>

        <li class="hidden pl-6 sm:block ">
            <router-link v-if="user" class="rounded-sm px-3 py-6 outline-none focus-visible:ring-2" to="/profile">
                {{ user.displayName }}
            </router-link>
            <router-link v-else class="rounded-sm py-6 outline-none focus-visible:ring-2" to="/auth/login">Login</router-link>
        </li>
        <li class="hidden sm:block">
            <ul class="flex items-center">
                <li v-if="user" class="px-3">$10.00</li>
                <li class="px-3 ">
                    <select name="" id="" class="bg-transparent	rounded-sm py-6 outline-none focus-visible:ring-2 cursor-pointer	">
                        <option value="">ENG</option>
                        <option value="">NL</option>
                        <option value="">FR</option>
                    </select>
                </li>
            </ul>
        </li>

    </ul>
</template>

<script setup lang="ts">
import useAuthentication from '../../composables/useAuthentication'
import { Home, Bed, Clipboard, Scroll, ConciergeBell } from 'lucide-vue-next'

const { user } = useAuthentication()

</script>