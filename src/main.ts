import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'

import zhCn from 'element-plus/es/locale/lang/zh-cn'

import pinia from './store/index.ts'

import 'element-plus/theme-chalk/dark/css-vars.css'

import '@/style/reset.css'
import '@/style/index.css'

import Icon from '@/components/Icon.vue'
import '@/assets/icon.js'

import { router } from './router'

const app = createApp(App)

app.component('Icon', Icon)
app.use(ElementPlus, {
	locale: zhCn
})
app.use(router)
app.use(pinia)
app.mount('#app')
