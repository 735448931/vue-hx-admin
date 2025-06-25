import SurveyInfo from './SurveyInfo.vue'
import PropComponent from './PropComponent.vue'

export interface SurveyInfoProps {
	text?: string
	desc?: string
	// 用于 PropComponent
	onChange?: (newProps: SurveyInfoProps) => void
	// 顶部是否禁用
	disabled?: boolean
}

const SurveyInfoDefaultProps = {
	text: '问卷标题',
	desc: '问卷描述'
}

export default {
	title: '标题',
	type: 'surveyInfo',
	component: SurveyInfo,
	propComponent: PropComponent,
	defaultProps: SurveyInfoDefaultProps
}
