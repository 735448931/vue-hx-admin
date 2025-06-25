import SurveyParagraph from './SurveyParagraph.vue'
import PropComponent from './PropComponent.vue'

export type SurveyParagraphProps = {
	text?: string
	isCenter?: boolean
	// 用于 PropComponent
	onChange?: (newProps: SurveyParagraphProps) => void
	disabled?: boolean
}

export const SurveyParagraphDefaultProps = {
	text: '一个段落',
	isCenter: false
}

export default {
	title: '标题',
	type: 'surveyParagraph',
	component: SurveyParagraph,
	propComponent: PropComponent,
	defaultProps: SurveyParagraphDefaultProps
}
