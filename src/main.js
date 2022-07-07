import './assets/scss/_main.scss';


import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import router from './routers'

const vueSetup = createApp(App)
vueSetup.use(router)
vueSetup.use(createPinia())
vueSetup.mount('#app')

import axiosSetup from "./axiosSetup"