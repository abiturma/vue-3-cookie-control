import { computed, ref, watch } from 'vue'
import { useCookies } from '@vueuse/integrations/useCookies'
import { createEventHook } from '@vueuse/core'
import createCookies from '../src/createCookies'
import { init } from '../src/helpers.js'

const cookieSettings = ref({
    necessary: [],
    optional: []
})

const open = ref(false)
const BrowserCookies = useCookies(['cookie_control_enabled', 'cookie_control_saved'])

const form = ref({})

const isSaved = computed(() => BrowserCookies.get('cookie_control_saved') === true)

const acceptance = createEventHook()


const cookies = computed(() => {
    const result = {}
    result.necessary = cookieSettings.value.necessary.map(cookie => Object.assign({}, cookie, { consent: true }))
    result.optional = cookieSettings.value.optional.map(cookie => Object.assign({}, cookie, { consent: hasConsent(cookie) }))
    return result
})

const initialize = (data) => {
    init(data)
    cookieSettings.value = createCookies(data)
}
const showBanner = computed(() => isSaved.value === false && cookies.value.optional.length > 0)

const cookiesEnabledIds = computed(() => cookies.value.optional.filter(cookie => cookie.consent).map(cookie => cookie.id))

watch(cookiesEnabledIds, (current, previous) => {
    for (const key of current) {
        if (current.includes(key) && !(previous ?? []).includes(key)) {
            const cookie = findCookie(key)
            if(typeof cookie?.accepted === 'function') {
                cookie.accepted()
            }
            acceptance.trigger(cookie)
        }
    }

}, { immediate: true, deep: true })

const findCookie = (id) => {
    for (const cookie of cookieSettings.value.optional) {
        if (cookie.id === id) {
            return cookie
        }
    }
    return null
}

const hasConsent = (cookie) => {
    const consented = BrowserCookies.get('cookie_control_enabled') ?? []
    return consented.includes(cookie.id)
}


export default function useCookieControl() {


    const newForm = () => {
        form.value = {}
        for (const cookie of cookies.value.optional) {
            form.value[cookie.id] = !!cookie.consent
        }
        return form
    }


    const save = () => {
        const result = []
        for (const key of Object.keys(form.value)) {
            if (form.value[key]) {
                result.push(key)
            }
        }
        BrowserCookies.set('cookie_control_enabled', result)
        closeSettings()
    }

    const rejectAll = () => {
        for (const key of Object.keys(form.value)) {
            form.value[key] = false
        }
        BrowserCookies.set('cookie_control_enabled', [])
        setTimeout(closeSettings, 50)
    }

    const acceptAll = () => {
        for (const key of Object.keys(form.value)) {
            form.value[key] = true
        }
        BrowserCookies.set('cookie_control_enabled', cookies.value.optional.map(cookie => cookie.id))
        setTimeout(closeSettings, 50)
    }

    const openSettings = () => {
        open.value = true
    }

    const closeSettings = () => {
        BrowserCookies.set('cookie_control_saved', true)
        open.value = false
    }


    return {
        initialize,
        openSettings,
        open,
        cookies,
        save,
        rejectAll,
        acceptAll,
        onAccepted: (callback) => {
            for (const key of cookiesEnabledIds.value) {
                callback(findCookie(key))
            }
            acceptance.on(callback)
        },
        showBanner,
        newForm,
    }


}
