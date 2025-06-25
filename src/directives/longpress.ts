import { isFunction } from '@/utils'
import type { Directive, DirectiveBinding } from 'vue'
import { useEventListener } from '@vueuse/core'
import { subAfter, subBefore } from '@/utils/'

// 使用说明:
// 1. v-longpress:1000     表示 长按1s后触发函数
// 2. v-longpress:1000:200 表示 长按1s后每200ms持续回调

export const longpress: Directive = {
	mounted(el, binding: DirectiveBinding<Function>) {
		// 默认500毫秒
		let num = 500
		// 持续时间
		let interNum = null
		let timer: number | null = null
		let interTimer: number | null = null

		let cb = binding.value

		const isInter = binding?.arg?.includes(':') ?? false

		if (isInter) {
			num = Number(subBefore(binding.arg || '', ':'))
			interNum = Number(subAfter(binding.arg || '', ':'))
		} else if (binding.arg) {
			num = Number(binding.arg)
		}

		console.log('num:', num)

		if (cb && isFunction(cb)) {
			const onDownInter = (ev: PointerEvent) => {
				ev.preventDefault()
				if (interTimer === null) {
					interTimer = setInterval(() => cb(), num)
				}
			}

			const onDown = (ev: PointerEvent) => {
				clear()
				ev.preventDefault()

				if (timer === null) {
					timer = isInter
						? setTimeout(() => {
								cb()
								onDownInter(ev)
						  }, num)
						: setTimeout(() => {
								cb()
						  }, num)
				}
			}

			const clear = () => {
				if (timer) {
					clearTimeout(timer)
					timer = null
				}
				if (interTimer) {
					clearInterval(interTimer)
					interTimer = null
				}
			}

			useEventListener(el, 'pointerdown', onDown)
			useEventListener(el, 'pointerup', clear)
			useEventListener(el, 'pointerleave', clear)
		}
	},
	unmounted() {}
}
