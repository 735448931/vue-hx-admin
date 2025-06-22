import type { DialogProps, ButtonProps } from 'element-plus'
import type { Component, VNode } from 'vue'

interface HeaderRenderer {
	close: Function
	titleId: string
	titleClass: string
}

type PartialDialogProps = Partial<DialogProps>

type PartialButtonProps = Partial<ButtonProps>

export type EventType = 'open' | 'close' | 'openAutoFocus' | 'closeAutoFocus'

type BtnClickDialog = {
	dialogState: DialogOptions
}
type BtnClickButton = {
	btn?: ButtonProps
}

export interface DialogOptions extends PartialDialogProps {
	/** 内容区组件的 `props`，可通过 `defineProps` 接收 */
	props?: any
	/** 是否隐藏 `Dialog` 按钮操作区的内容 */
	hideFooter?: boolean
	visible?: boolean
	/** 点击确定按钮后是否开启 `loading` 加载动画 */
	sureBtnLoading?: boolean
	/** @description 自定义对话框标题的内容渲染器 */
	headerRenderer?: ({
		close,
		titleId,
		titleClass
	}: HeaderRenderer) => VNode | Component
	/** 自定义内容渲染器 */
	contentRenderer?: ({
		dialogState
	}: {
		dialogState: DialogOptions
	}) => VNode | Component
	/** 自定义按钮操作区的内容渲染器，会覆盖`footerButtons`以及默认的 `取消` 和 `确定` 按钮 */
	footerRenderer?: ({
		dialogState
	}: {
		dialogState: DialogOptions
	}) => VNode | Component
	/** 自定义底部按钮操作 */
	footerButtons?: Array<ButtonOptions>
	/** `Dialog` 打开后的回调 */
	open?: ({ options }: { options: DialogOptions }) => void
	/** `Dialog` 关闭后的回调（只有点击右上角关闭按钮或空白页或按下了esc键关闭页面时才会触发） */
	close?: ({ options }: { options: DialogOptions }) => void
	/** `Dialog` 关闭后的回调。 `args` 返回的 `command` 值解析：`cancel` 点击取消按钮、`sure` 点击确定按钮、`close` 点击右上角关闭按钮或空白页或按下了esc键  */
	closeCallBack?: ({
		options,
		args
	}: {
		options: DialogOptions
		args: any
	}) => void
	/** 输入焦点聚焦在 `Dialog` 内容时的回调 */
	openAutoFocus?: ({ options }: { options: DialogOptions }) => void
	/** 输入焦点从 `Dialog` 内容失焦时的回调 */
	closeAutoFocus?: ({ options }: { options: DialogOptions }) => void
	/** 点击底部取消按钮的回调，会暂停 `Dialog` 的关闭. 回调函数内执行 `done` 参数方法的时候才是真正关闭对话框的时候 */
	beforeCancel?: (done: Function, dialogState: DialogOptions) => void
	/** 点击底部确定按钮的回调，会暂停 `Dialog` 的关闭. 回调函数内执行 `done` 参数方法的时候才是真正关闭对话框的时候 */
	beforeSure?: (
		done: Function,
		{
			dialogState,
			closeLoading
		}: {
			dialogState: DialogOptions
			/** 关闭确定按钮的 `loading` 加载动画 */
			closeLoading: Function
		}
	) => void
}

export interface ButtonOptions extends PartialButtonProps {
	label: string
	/** 点击按钮后触发的回调 */
	btnClick?: ({
		dialog,
		button
	}: {
		/** 当前 `Dialog` 信息 */
		dialog: BtnClickDialog
		/** 当前 `button` 信息 */
		button: BtnClickButton
	}) => void
}
