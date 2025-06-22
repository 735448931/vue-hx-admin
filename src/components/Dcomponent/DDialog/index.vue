<template>
	<el-dialog v-model="dialogState.visible" v-bind="dialogState" @closed="handleClose(dialogState)"
		@opened="eventsCallBack('open', dialogState)" @openAutoFocus="eventsCallBack('openAutoFocus', dialogState)"
		@closeAutoFocus="eventsCallBack('closeAutoFocus', dialogState)">
		<!-- header -->
		<template #header="{ close, titleId, titleClass }" v-if="dialogState?.headerRenderer">
			<component :is="dialogState?.headerRenderer({ close, titleId, titleClass })
				"></component>
		</template>

		<!-- default -->
		<template #default>
			<component v-bind="dialogState?.props" v-if="dialogState.contentRenderer"
				:is="dialogState.contentRenderer({ dialogState })"></component>
		</template>

		<!-- footer -->
		<template #footer v-if="!dialogState?.hideFooter">
			<template v-if="dialogState?.footerRenderer">
				<component :is="dialogState?.footerRenderer({ dialogState })"></component>
			</template>

			<span v-else>
				<template v-for="(btn, index) in footerButtons(dialogState)" :key="index">
					<el-button v-bind="btn" :loading="sureBtnIsloading" @click="btn.btnClick({
						dialog: { dialogState },
						button: { btn }
					})">{{ btn?.label }}</el-button>
				</template>
			</span>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import {
	dialogState,
	useDialog
} from '@/components/Dcomponent/DDialog/useDialog'

import { type ButtonOptions } from './types'

const { closeDialog } = useDialog()
import type { DialogOptions, EventType } from './types'

function isFunction(value: unknown): value is Function {
	return typeof value === 'function'
}

const eventsCallBack = (event: EventType, options: DialogOptions) => {
	if (options?.[event] && isFunction(options?.[event])) {
		return options?.[event]({ options })
	}
}

const handleClose = (options: DialogOptions, args = { commadn: 'close' }) => {
	closeDialog(options, args)
	eventsCallBack('close', options)
}

const sureBtnIsloading = ref<boolean>(false);


const footerButtons = computed(() => {
	return (dialogState: DialogOptions) => {
		if (dialogState.footerButtons && dialogState.footerButtons.length > 0) {

			return dialogState.footerButtons
		} else {
			const defaultButton = [
				{
					label: '确定',
					type: "primary",
					text: true,
					bg: true,
					btnClick: ({ dialog: { dialogState } }) => {
						if (dialogState?.sureBtnLoading) {
							sureBtnIsloading.value = true
						}

						const closeLoading = () => {
							if (dialogState?.sureBtnLoading) {
								sureBtnIsloading.value = false
							}
						}

						const done = () => {
							closeLoading()
							closeDialog(dialogState, { command: "sure" })
						}

						if (dialogState?.beforeSure && isFunction(dialogState?.beforeSure)) {
							dialogState?.beforeSure(done, { dialogState, closeLoading })
						} else {
							done()
						}
					}

				},
				{
					label: '取消',
					text: true,
					bg: true,
					btnClick: ({ dialog: { dialogState } }) => {
						const done = () => {
							closeDialog(dialogState, { command: 'cancel' })
						}

						if (dialogState?.beforeCancel && isFunction(dialogState?.beforeCancel)) {
							dialogState?.beforeCancel(done, dialogState)
						} else {
							done()
						}
					}
				}
			] as any as Array<ButtonOptions>
			return defaultButton
		}
	}
})

onMounted(() => { })
</script>

<style scoped></style>
