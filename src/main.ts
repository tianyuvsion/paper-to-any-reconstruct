import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { pinia } from './stores'

// 注册原版 3D 机械骨骼与序列帧 Web Component
import './utils/object-motion'

// 样式系统装载
import './styles/main.css'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
