//import { registerVueControllerComponents } from '@symfony/ux-vue';
import './bootstrap.js';
/*
 * Welcome to your app's main JavaScript file!
 *
 * This file will be included onto the page via the importmap() Twig function,
 * which should already be in your base.html.twig.
 */
import './styles/app.css';

import { createApp } from 'vue';
import App from './vue/App.vue';

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})

createApp(App).use(vuetify).mount('#app')

console.log('This log comes from assets/app.js - welcome to AssetMapper! 🎉');

registerVueControllerComponents(require.context('./vue/controllers', true, /\.vue$/));
registerVueControllerComponents();