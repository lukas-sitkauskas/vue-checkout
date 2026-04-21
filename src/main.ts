import { createApp } from 'vue'
import ui from '@nuxt/ui/vue-plugin'
import { VueQueryPlugin } from '@tanstack/vue-query'
import './style.css'
import App from './App.vue'
import router from './router'

createApp(App).use(router).use(ui).use(VueQueryPlugin).mount('#app')
