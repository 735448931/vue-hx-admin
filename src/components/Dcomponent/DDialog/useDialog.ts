import { reactive, ref } from 'vue'
import type { DialogOptions } from './types'

import { useTimeoutFn } from '@vueuse/core'

export const dialogState = ref<DialogOptions>({})
export const useDialog = () => {
	const addDialog = (options: DialogOptions) => {
		const open = () => {
			dialogState.value = { ...options, visible: true }
		}

		if (options?.openDelay) {
			useTimeoutFn(() => {
				open()
			}, options.openDelay)
		} else {
			open()
		}
	}
	// todo：待测试
	const closeDialog = (options: DialogOptions, args?: any) => {
		dialogState.value.visible = false
		options.closeCallBack && options.closeCallBack({ options, args })

		// 这里用?? 不能用 || 原因:如果 options?.closeDelay = 0 那么结果就是延迟200右侧了
		const closeDelay = options?.closeDelay ?? 200

		useTimeoutFn(() => {
			dialogState.value = {}
		}, closeDelay)
	}

	return { addDialog, closeDialog }
}
