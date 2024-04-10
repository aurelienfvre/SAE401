import { ref, readonly } from 'vue';

const locale = ref(localStorage.getItem('locale') || 'fr');

function setLocale(newLocale) {
    locale.value = newLocale;
    localStorage.setItem('locale', newLocale);
}

export function useLanguageStore() {
    return {
        locale: readonly(locale),
        setLocale,
    };
}
