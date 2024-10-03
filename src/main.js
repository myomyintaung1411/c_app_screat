import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Vant from 'vant';
import 'vant/lib/index.css';
import router from './routes.js'
import store from './store'
import Vue3Marquee from 'vue3-marquee'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(Vant); // Register all Vant UI components globally
app.use(Vue3Marquee)
app.mount('#app')
