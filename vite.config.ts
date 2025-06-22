import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
	resolve: {
		alias: {
			'@': `${path.resolve(__dirname, 'src')}/`
		}
	},

	plugins: [
		vue(),
		AutoImport({
			resolvers: [ElementPlusResolver()]
		}),
		Components({
			resolvers: [ElementPlusResolver()]
		}),
		vueJsx({})
	]
})
