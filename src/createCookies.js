import { acceptGa, acceptHj } from './helpers'

export default function createCookies(ids = {}) {


    const optional = [];

    if (ids.gaId) {
        optional.push({
            id: 'google-analytics',
            name: {
                en: 'Google Analytics',
                de: 'Google Analytics'
            },
            description: {
                en: "Google Analytics provide insights on how many visitors enter our page",
                de: 'Google Analytics hilft uns zu erkennen wie viele Nutzer unsere Seite besuchen.'
            },
            initialState: true,
            src: `https://load.home.abiturma.de/ekbxmllt.js?id=${ids.gaId}`,
            async: true,
            cookies: ['_ga', '_gat', '_gid'],
            targetCookieIds: ['_ga', '_gat', '_gid'],
            accepted:acceptGa
        })
    }

    if (ids.hjId) {
        optional.push({
            id: 'hotjar',
            name: {
                en: "Hotjar",
                de: 'Hotjar'
            },
            description: {
                en: "Hotjar helps us improving the user experience on our site",
                de: 'Hotjar hilft uns die korrekte Funktionsweise unserer Seite sicherzustellen.'
            },
            initialState: true,
            src: `https://static.hotjar.com/c/hotjar-${ids.hjId}.js?sv=6`,
            async: true,
            cookies: ['_hjid', '_hjFirstSeen', '_hjIncludedInPageviewSample', '_hjAbsoluteSessionInProgress'],
            targetCookieIds: ['_hjid', '_hjFirstSeen', '_hjIncludedInPageviewSample', '_hjAbsoluteSessionInProgress'],
            accepted: acceptHj
        })
    }


    return {
        necessary: [
            {
                id: 'functional',
                name: {
                    en: "Necessary Cookies",
                    de: 'Funktionale cookies'
                },
                description: {
                    en: "Saves your privacy settings",
                    de: 'Speichern Ihre Datenschutzeinstellungen.'
                },
                cookies: ['cookie_control_consent', 'cookie_control_enabled_cookies'],
                targetCookieIds: ['cookie_control_consent', 'cookie_control_enabled_cookies']
            }
        ],
        optional: optional
    }
}
