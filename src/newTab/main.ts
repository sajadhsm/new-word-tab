import storage from '@/modules/localStorage'
import { createApp } from 'vue'

import App from './App.vue'
import '@/styles/normalize.css'

import '@/styles/index.css'

const app = createApp(App)
app.mount('#app')

// Remove actions position from storage
// It's temporarily and will be removed once all users upgraded to the next version
storage.remove('ap')
