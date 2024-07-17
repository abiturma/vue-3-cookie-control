<template>
    <transition leave-active-class="transition ease-in duration-150 delay-75" leave-from-class="opacity-100" leave-to-class="opacity-0"
                enter-active-class="transition ease-in duration-150 delay-1000" enter-from-class="opacity-0" enter-to-class="opacity-100"
    >
        <aside
            class="fixed bottom-0 h-24 z-20 w-full bg-[#c3b49e] flex justify-between items-center px-8 text-sm text-white"
            v-if="show && showBanner">
            <div>
                Wir verwenden ein Minimum an Cookies, um die korrekte Funktionsweise unserer Webseite sicherzustellen.
            </div>
            <div class="space-x-4">
                <button type="button" class="font-semibold text-[#7e7464] hover:text-[#514842]" @click="openSettings">verwalten
                </button>
                <button type="button"
                        class="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                        @click="acceptAll">Akzeptieren
                </button>
            </div>
        </aside>
    </transition>
    <CookieControlModal v-model="open"/>
</template>

<script setup>
import CookieControlModal from './CookieControlModal.vue'
import useCookieControl from '../composables/useCookieControl.js'
import { onMounted, ref } from 'vue'


const { openSettings, open, showBanner, acceptAll } = useCookieControl()

const show = ref(false)

onMounted(() => setTimeout(() => show.value = true, 1000))

</script>
