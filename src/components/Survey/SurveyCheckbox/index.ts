import SurveyCheckbox from './SurveyCheckbox.vue'
import PropComponent from './PropComponent.vue'

export type OptionType = {
	value: string
	text: string
	checked: boolean
}

export type SurveyCheckboxProps = {
	title?: string
	isVertical?: boolean
	list: OptionType[]
	// 用于 PropComponent
	onChange?: (newProps: SurveyCheckboxProps) => void
	disabled?: boolean
}

export const SurveyCheckboxDefaultProps: SurveyCheckboxProps = {
	title: '多选标题',
	isVertical: false,
	list: [
		{ value: '选项1', text: '选项1', checked: false },
		{ value: '选项2', text: '选项2', checked: false },
		{ value: '选项3', text: '选项3', checked: false }
	]
}

export default {
	title: '单选',
	type: 'surveyCheckbox',
	component: SurveyCheckbox,
	propComponent: PropComponent,
	defaultProps: SurveyCheckboxDefaultProps
}
