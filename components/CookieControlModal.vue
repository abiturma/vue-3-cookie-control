<template>
    <TransitionRoot as="template" :show="open">
        <Dialog class="relative z-10" @close="open = false">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                             leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
            </TransitionChild>

            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300"
                                     enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                     enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                                     leave-from="opacity-100 translate-y-0 sm:scale-100"
                                     leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel
                            class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6">
                            <div class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                                <button type="button"
                                        class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                                        @click="open = false">
                                    <span class="sr-only">Schließen</span>
                                    <XMarkIcon class="h-6 w-6" aria-hidden="true"/>
                                </button>
                            </div>
                            <div>
                                <DialogTitle as="h3" class="text-2xl font-semibold leading-6 text-gray-900 mb-6">Cookies
                                    verwalten
                                </DialogTitle>

                                <div class="space-y-8 my-10">

                                    <div>
                                        <h4 class="text-lg font-semibold leading-6 text-gray-800 mb-2">Notwendige
                                            Cookies</h4>
                                        <ul class="space-y-2">
                                            <li v-for="cookie in cookies.necessary" :key="cookie.id">
                                                <CookieControlSwitch disabled :model-value="true">
                                                    <span class="font-medium text-gray-900">{{ cookie.name?.de }}</span>
                                                    <span class="text-gray-500 ml-1">&ndash; {{ cookie.description?.de }}</span>
                                                </CookieControlSwitch>
                                            </li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 class="text-lg font-semibold leading-6 text-gray-800 mb-2">Optionale Cookies</h4>
                                        <ul class="space-y-2">
                                            <li v-for="cookie in cookies.optional" :key="cookie.id">
                                                <CookieControlSwitch v-model="form[cookie.id]">
                                                    <span class="font-medium text-gray-900">{{ cookie.name?.de }}</span>
                                                    <span class="text-gray-500 ml-1">&ndash; {{ cookie.description?.de }}</span>
                                                </CookieControlSwitch>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                    <div class="flex space-x-6">
                                        <button type="button"
                                                class=" transition-colors rounded-md bg-amber-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-800"
                                        @click="save"
                                        >
                                            Speichern
                                        </button>
                                        <button type="button"
                                                class=" transition-colors rounded-md bg-amber-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-800"
                                        @click="rejectAll">
                                            Alle ablehnen
                                        </button>
                                        <button type="button"
                                                class=" transition-colors rounded-md bg-amber-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-800"
                                        @click="acceptAll">
                                            Alle akzeptieren
                                        </button>
                                    </div>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import useCookieControl from '../composables/useCookieControl.js'
import CookieControlSwitch from './CookieControlSwitch.vue'

const { newForm, cookies, acceptAll, save, rejectAll } = useCookieControl()

const form = newForm()

const open = defineModel({
    type: Boolean,
    default: false
})


</script>
