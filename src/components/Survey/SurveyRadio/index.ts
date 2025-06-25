import SurveyRadio from './SurveyRadio.vue'
import PropComponent from './PropComponent.vue'

export interface OptionType {
	value: string
	text: string
}

export interface SurveyRadioProps {
	title?: string
	isVertical?: boolean
	options?: OptionType[]
	value?: string
	// 用于 PropComponent
	onChange?: (newProps: SurveyRadioProps) => void
	disabled?: boolean
}

export const SurveyRadioDefaultProps: SurveyRadioProps = {
	title: '单选标题',
	isVertical: false,
	options: [
		{ value: '1', text: '选项1' },
		{ value: '2', text: '选项2' },
		{ value: '3', text: '选项3' }
	],
	value: ''
}

export default {
	title: '单选',
	type: 'surveyRadio',
	component: SurveyRadio,
	propComponent: PropComponent,
	defaultProps: SurveyRadioDefaultProps
}
