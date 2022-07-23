import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import { login } from './utils/login'
login()

createApp(App).mount('#app')
