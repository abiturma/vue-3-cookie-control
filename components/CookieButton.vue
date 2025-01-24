<template>
    <div @click="openSettings"
            class="inline-block text-sm text-gray-600 hover:text-gray-900"
    >
        Datenschutzeinstellungen ändern
    </div>
</template>

<script setup lang="ts">
import useCookieControl from "../composables/useCookieControl.js";
const { openSettings }  = useCookieControl()
</script>
