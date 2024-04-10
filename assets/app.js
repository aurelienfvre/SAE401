import { createApp } from 'vue';
import App from './vue/App.vue';
import router from './vue/router';
import { Magnetic } from "./vue/directives/Magnetic";
import i18n from './vue/i18n/i18n';
import { useLanguageStore } from './vue/stores/languageStore'; // Importez votre store de langue

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import './styles/app.scss';

const vuetify = createVuetify({ components, directives });

const app = createApp(App);

// Créer une instance de votre store de langue et le fournir à l'application
const languageStore = useLanguageStore();
app.provide('languageStore', languageStore);

app.use(vuetify);
app.use(router);
app.use(i18n);
app.directive("magnetic", Magnetic);
app.mount('#app');
