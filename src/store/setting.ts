import { defineStore } from 'pinia'

interface SettingStore {
	sideIsCollapse: boolean
}

const useSettingStore = defineStore('setting', {
	state: (): SettingStore => {
		return {
			sideIsCollapse: false
		}
	},
	actions: {
		changeSideCollapse() {
			this.sideIsCollapse = !this.sideIsCollapse
		}
	}
})

export default useSettingStore
