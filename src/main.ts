import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { pinia } from './stores'

// 样式系统装载
import './styles/main.css'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
