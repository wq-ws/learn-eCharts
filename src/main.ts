import { createApp } from 'vue'
import './style.css'
import * as echarts from 'echarts'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.config.globalProperties.$echarts = echarts
app.use(router)

app.mount('#app')
