import { defineStore } from 'pinia'
import { cloneDeep } from 'lodash-es'
import { nanoid } from 'nanoid'
import type { ComponentProps } from '@/components/Survey'

export interface ComponentInfo {
	fe_id: string
	type: string
	title: string
	isHidden?: boolean
	isLocked?: boolean
	component?: any
	props: ComponentProps
}
export interface PageInfo {
	title: string
	desc?: string
	js?: string
	css?: string
	isPublished?: boolean
}

interface SurveyStore {
	pageInfo: PageInfo
	selectedId: string
	componentList: ComponentInfo[]
	copiedComponent: ComponentInfo | null
	setComponentList: (data: any) => void
	setPageInfo: (data: any) => void
	addComponent: (component: ComponentInfo) => void
	// 右侧面板修改属性
	changeComponentProps: (data: {
		fe_id: string
		newProps: ComponentProps
	}) => void
	// 顶部删除组件
	removeSelectedComponent: () => void
	// 顶部锁定组件
	toggleComponentLocked: (data: { fe_id: string }) => void
	// 顶部复制组件
	copySelectedComponent: () => void
	// 顶部粘贴组件
	pasteCopiedComponent: () => void
	// 顶部选择上一个组件
	selectPrevComponent: () => void
	// 顶部选择下一个组件
	selectNextComponent: () => void
}

const useSurveyStore = defineStore('survey', {
	state: (): SurveyStore => {
		return {
			pageInfo: {
				title: '测试'
			},
			selectedId: '',
			componentList: []
		}
	},
	actions: {
		// 添加一个新的组件
		addComponent(component: ComponentInfo) {
			const index = this.componentList.findIndex(
				(component) => component.fe_id === this.selectedId
			)
			if (index >= 0) {
				this.componentList.splice(index + 1, 0, component)
			} else {
				this.componentList.push(component)
			}
		},
		// 删除一个组件
		removeSelectedComponent() {
			const index = this.componentList.findIndex(
				(component) => component.fe_id === this.selectedId
			)

			const oldLength = this.componentList.length

			if (index < 0) return

			this.componentList.splice(index, 1)

			if (index + 1 === oldLength) {
				// 当删除的是最后一项时,删除后最新选择应该是最后一项
				if (index === 0) {
					this.selectedId = ''
				} else {
					this.selectedId =
						this.componentList[this.componentList.length].fe_id
				}
			} else {
				// 当删除的是中间某一项时,删除后重新选择相同的索引
				this.selectedId = this.componentList[index].fe_id
			}
		},
		// 复制一个当前选中的组件
		copySelectedComponent() {
			const selectedComponent = this.componentList.find((item) => {
				return item.fe_id === this.selectedId
			})

			if (!selectedComponent) return

			const copyComponent = cloneDeep(selectedComponent)
			this.copiedComponent = copyComponent
		},
		// 粘贴一个已复制组件
		pasteCopiedComponent() {
			if (!this.copiedComponent) return

			const newComponent = { ...this.copiedComponent, fe_id: nanoid() }

			const index = this.componentList.findIndex((component) => {
				return component.fe_id === this.copiedComponent?.fe_id
			})

			if (index < 0) {
				return
			} else {
				this.componentList.splice(index + 1, 0, newComponent)
			}
		},
		// 上移选中组件
		selectPrevComponent() {
			const selectedIndex = this.componentList.findIndex((component) => {
				return component.fe_id === this.selectedId
			})

			if (selectedIndex <= 0) return

			this.selectedId = this.componentList[selectedIndex - 1].fe_id
		},
		// 下移选中组件
		selectNextComponent() {
			const selectedIndex = this.componentList.findIndex((component) => {
				return component.fe_id === this.selectedId
			})
			if (selectedIndex + 1 === this.componentList.length) return

			this.selectedId = this.componentList[selectedIndex + 1].fe_id
		},
		changeComponentProps(data: {
			fe_id: string
			newProps: ComponentProps
		}) {
			const { fe_id, newProps } = data

			this.componentList.forEach((component) => {
				if (component.fe_id === fe_id) {
					component.props = newProps
				}
			})
		}
	}
})

export default useSurveyStore
