import { createApp, type Directive } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'

import zhCn from 'element-plus/es/locale/lang/zh-cn'

import pinia from './store/index.ts'

import 'element-plus/theme-chalk/dark/css-vars.css'

import '@/style/reset.css'
import '@/style/index.css'

import Icon from '@/components/Icon.vue'
import '@/assets/icon.js'

import VxeUIAll from 'vxe-pc-ui'
import 'vxe-pc-ui/lib/style.css'
import VxeUITable from 'vxe-table'
import 'vxe-table/lib/style.css'

import { router } from './router'

const app = createApp(App)

import * as directives from '@/directives'
Object.keys(directives).forEach((key) => {
	app.directive(key, (directives as { [key: string]: Directive })[key])
})

app.component('Icon', Icon)
app.use(ElementPlus, {
	locale: zhCn
})
app.use(router)
app.use(pinia)
app.use(VxeUIAll)
app.use(VxeUITable)
app.mount('#app')
