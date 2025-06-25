import SurveyTextarea from './SurveyTextarea.vue'
import PropComponent from './PropComponent.vue'
export type SurveyTextareaProps = {
	title?: string
	placeholder?: string
	disabled?: boolean
	onChange?: (newProps: SurveyTextareaProps) => void
}

const SurveyTextareaDefaultProps = {
	title: '输入框标题',
	placeholder: '请输入...'
}

export default {
	title: '文本输入',
	type: 'SurveyTextarea',
	component: SurveyTextarea,
	propComponent: PropComponent,
	defaultProps: SurveyTextareaDefaultProps
}
