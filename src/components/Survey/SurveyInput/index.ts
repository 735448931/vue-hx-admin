import SurveyInput from './SurveyInput.vue'
import PropComponent from './PropComponent.vue'

export type SurveyInputProps = {
	title?: string
	placeholder?: string
	disabled?: boolean
	onChange?: (newProps: SurveyInputProps) => void
}

const SurveyInputDefaultProps = {
	title: '输入框标题',
	placeholder: '请输入...'
}

export default {
	title: '文本输入',
	type: 'surveyInput',
	component: SurveyInput,
	propComponent: PropComponent,
	defaultProps: SurveyInputDefaultProps
}
