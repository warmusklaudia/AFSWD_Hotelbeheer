<template>
    <RouteHolder title="Profile">
        <button @click="handleLogOut">Log out</button>
    </RouteHolder>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import RouteHolder from '../components/holders/RouteHolder.vue'
import useAuthentication from "../composables/useAuthentication";

const { logout } = useAuthentication()
const { replace } = useRouter()

const handleLogOut = () => {
    logout().then(() => {
        replace('auth/login')
    })
}
</script>