<template>
    <SwitchGroup as="div" class="flex items-center" >
        <Switch v-model="enabled" :class="[background, 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400']"
                :disabled="disabled"
        >
            <span aria-hidden="true" :class="[enabled ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']" />
        </Switch>
        <SwitchLabel as="span" class="ml-3 text-sm">
            <slot/>
          
        </SwitchLabel>
    </SwitchGroup>
</template>

<script setup>
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'
import { computed } from 'vue'

const props = defineProps({
    disabled: {
        type: Boolean,
        default: false
    }
})

const enabled = defineModel({
    type: Boolean,
    default: false
})

// const background = 'bg-amber-600'
const background = computed(() => {
    if(props.disabled) {
        return enabled.value ? 'bg-amber-200' : 'bg-gray-200'
    }
    return enabled.value ? 'bg-amber-600' : 'bg-gray-200'
})

const focus = computed(() => props.disabled ? 'focus:ring-transparent' : 'focus:ring-amber-400')

</script>
