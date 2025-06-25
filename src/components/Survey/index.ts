import type { Component } from 'vue'
import SurveyTitleConf from './SurveyTitle'
import SurveyInfoConf, { type SurveyInfoProps } from './SurveyInfo'
import SurveyParagraphConf from './SurveyParagraph'
import SurveyInputConf from './SurveyInput'
import SurveyTextareaConf from './SurveyTextarea'
import SurveyRadioConf from './SurveyRadio'
import SurveyCheckboxConf from './SurveyCheckbox'

// 每个组件的配置 Prop
export type ComponentProps = SurveyInfoProps

// 一个组件的所有数据
export interface ComponentConf {
	title: string
	type: string
	component?: Component
	propComponent?: Component
	defaultProps?: any
}

// 全部的组件配置的列表
const componentConfList: ComponentConf[] = [
	SurveyTitleConf,
	SurveyInfoConf,
	SurveyParagraphConf,
	SurveyInputConf,
	SurveyTextareaConf,
	SurveyRadioConf,
	SurveyCheckboxConf
]

export const componentConfGroup = [
	{
		groupId: 'textGroup',
		groupName: '文本显示',
		components: [SurveyInfoConf, SurveyTitleConf, SurveyParagraphConf]
	},
	{
		groupId: 'inputGroup',
		groupName: '用户输入',
		components: [SurveyInputConf, SurveyTextareaConf]
	},
	{
		groupId: 'chooseGroup',
		groupName: '用户选择',
		components: [SurveyRadioConf, SurveyCheckboxConf]
	}
]

export const getComponentConfByType = (type: string) => {
	return componentConfList.find((c) => c.type === type)
}
