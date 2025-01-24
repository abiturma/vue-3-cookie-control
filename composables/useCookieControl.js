import { computed, ref } from 'vue'
import { useLocalStorage } from "@vueuse/core";

const storage = useLocalStorage('consent_control', {
    saved: false, 
    consent: {
            ad_storage: false,
            analytics_storage: false,
            personalization_storage: false,
            ad_user_data : false,
            ad_personalization: false,
    },
    updated_at: new Date()
})

//todo: if updated at is old - reset consent

const open = ref(false)
const form = reactive({
    settings: {},
    descriptions: {
        ad_storage: 'Ermöglicht das Speichern von werbebezogenen Daten wie Cookies',
        analytics_storage: 'Ermöglicht das Speichern von analysebezogenen Daten wie Cookies, z. B. zur Besuchsdauer',
        personalization_storage: 'Ermöglicht das Speichern von Daten mit Bezug zur Personalisierung, z. B. Videoempfehlungen',
        ad_user_data: 'Legt die Einwilligung zum Senden von werbebezogenen Nutzerdaten an Google fest',
        ad_personalization: 'Legt die Einwilligung für personalisierte Anzeigen fest',
    },
    names: {
        ad_storage: 'Ad Storage',
        analytics_storage: 'Google Analytics',
        personalization_storage: 'Personalization Storage',
        ad_user_data: 'Ad User Data',
        ad_personalization: 'Ad Personalization',
    },
    reset() {
        for(const key in storage.value.consent) {
            this.settings[key] = isSaved.value ? storage.value.consent[key] : true
        }
    }
})
const isSaved = computed(() => storage.value.saved === true)
const showBanner = computed(() => isSaved.value === false)
window.dataLayer = window.dataLayer || [];
const dataLayer = window.dataLayer

const sendUpdate = () => {
    const consent = toRaw(storage.value.consent)
    dataLayer.push({
        event: 'consent_updated',
        consent
    });
}


if(isSaved.value) {
    sendUpdate()    
}

export default function useCookieControl() {


    const submitForm = () => {
        storage.value.consent = form.settings
        sendUpdate()
        save()
        setTimeout(closeSettings, 50)
    }


    const save = () => {
        storage.value.updated_at = new Date()
        storage.value.saved = true
    }

    const rejectAll = () => {
        for(const key in storage.value.consent) {
            storage.value.consent[key] = false
        }
        form.reset()
        sendUpdate()
        save()
        setTimeout(closeSettings, 50)
    }

    const acceptAll = () => {
        for(const key in storage.value.consent) {
            storage.value.consent[key] = true
        }
        form.reset()
        sendUpdate()
        save()
        setTimeout(closeSettings, 50)
    }
    

    const openSettings = () => {
        open.value = true
    }

    const closeSettings = () => {
        open.value = false
    }
    
   


    return {
        openSettings,
        open,
        rejectAll,
        acceptAll,
        showBanner,
        form,
        submitForm
    }


}
