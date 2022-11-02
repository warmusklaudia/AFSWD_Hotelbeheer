<template>
    <section>
        <h2 class="font-title font-bold text-2xl md:text-3xl lg:text-4xl mb-6 text-center">Your booking is confirmed
        </h2>
        <div class="grid grid-cols-[1fr_2fr]">
            <div>
                room
            </div>
            <div class="grid grid-cols-3">
                <div>
                    <p class="font-title font-bold">Guest</p>
                    <p>{{ user?.displayName }}</p>
                </div>
                <div>
                    <p class="font-title font-bold">Check-in</p>
                </div>
                <div>
                    <p class="font-title font-bold">Check-out</p>
                </div>
                <div>
                    <p class="font-title font-bold">Reservation Nr.</p>
                </div>
                <div>
                    <p class="font-title font-bold">Email</p>
                    <p>{{ user?.email }}</p>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import useAuthentication from "../../../composables/useAuthentication";

const { user } = useAuthentication()
</script>