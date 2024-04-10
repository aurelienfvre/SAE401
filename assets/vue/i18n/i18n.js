// i18n.js
import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import fr from './locales/fr.json';

// Tentez de récupérer la langue sauvegardée dans le localStorage, sinon utilisez la langue du navigateur
const savedLocale = localStorage.getItem('locale') || navigator.language.split('-')[0] || 'en';

const i18n = createI18n({
    legacy: false,
    locale: savedLocale,
    fallbackLocale: 'en',
    messages: {
        en,
        fr,
    },
});

export default i18n;
