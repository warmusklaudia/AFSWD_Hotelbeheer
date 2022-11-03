<template>
    <div class="px-6 pt-6">
        <main class="mx-auto max-w-6xl h-full grid grid-rows-[auto_1fr]">
            <div class="flex justify-between items-center pb-6">
                <h1 class="text-3xl md:text-4xl font-title lg:text-5xl font-bold text-themeGreen">{{ title }}</h1>
                <slot name="header-actions"></slot>
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