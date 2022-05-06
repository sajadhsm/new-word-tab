import '@/initTheme';

import { createApp } from 'vue';
import App from './App.vue';

import '@/styles/normalize.css';
import '@/styles/index.css';

const app = createApp(App);
app.mount('#app');
