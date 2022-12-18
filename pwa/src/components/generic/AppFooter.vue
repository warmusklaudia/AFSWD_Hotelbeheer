<template>
    <div class="m-3 md:px-6">
        <footer class="mx-auto hidden max-w-6xl sm:block">
            <p class="text-sm text-neutral-800">
                Carmino Deschuijmere & Klaudia Warmus - {{ $t('footer.disclaimer') }} {{ new Date().getFullYear() }}
            </p>
        </footer>
        <nav class="flex sm:hidden">
            <AppNavigation />
        </nav>
    </div>
</template>

<script setup lang="ts">
import AppNavigation from './AppNavigation.vue'

</script>
