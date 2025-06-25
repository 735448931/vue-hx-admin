import SurveyTitle from './SurveyTitle.vue'
import PropComponent from './PropComponent.vue'

export interface SurveyTitleProps {
	text?: string
	level?: 1 | 2 | 3
	isCenter?: boolean
	disabled?: boolean
	onChange?: (newProps: SurveyTitleProps) => void
}

export const SurveyTitleDefaultProps = {
	text: '一行标题',
	level: 1,
	isCenter: false
}

export default {
	title: '标题',
	type: 'surveyTitle',
	component: SurveyTitle,
	propComponent: PropComponent,
	defaultProps: SurveyTitleDefaultProps
}
