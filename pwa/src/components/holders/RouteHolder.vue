<template>
    <div class="px-6 pt-6">
        <main class="mx-auto max-w-6xl">
            <div class="flex justify-between items-center">
                <h1 class="font-title text-5xl font-bold text-themeGreen">{{ title }}</h1>
            </div>
            <slot></slot>
        </main>
    </div>
</template>

<script setup lang="ts">

const { title } = defineProps<{
    title: string
}>()

// const props = defineProps({
//     title: {
//         type: String,
//         required: false
//     }
// })

</script>