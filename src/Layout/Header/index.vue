<template>
	<el-header>
		<div class="header-container">
			<div class="header-container-left">
				<div @click="toggleSideCollapse">
					<Icon v-if="!settingStore.sideIsCollapse" name="icon-toggle-left"></Icon>
					<Icon v-else name="icon-toggle-right"></Icon>
				</div>
				<div class="header-title">首页</div>
			</div>
			<div class="header-container-right">
				<div class="header-container-right-option" @click="toggleTheme">
					<Icon name="icon-heibai"></Icon>
				</div>
				<div class="header-container-right-option" @click="openLanguage">
					<el-dropdown @command="handleCommand" trigger="contextmenu" ref="languageDropdown">
						<Icon name="icon-fanyi"></Icon>
						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item command="chinese">中文</el-dropdown-item>
								<el-dropdown-item command="english">English</el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>
				</div>
				<div class="header-container-right-option" @click="toggleFullScreen">
					<Icon name="icon-fullscreen-expand" v-if="!isFullscreen"></Icon>
					<Icon name="icon-fullscreen-shrink" v-else></Icon>
				</div>
				<div class="header-container-right-option" @click="openBell">
					<el-badge :value="7" class="item" type="primary" :style="{ display: 'flex' }" color="red">
						<el-dropdown popper-class="header-bell" trigger="contextmenu" ref="bellRef">
							<Icon name="icon-notification"></Icon>
							<template #dropdown>
								<el-tabs :stretch="true" :style="{ width: '330px' }" v-model="activeName"
									@tab-click="handleTabClick">
									<el-tab-pane label="通知" name="notify">
										<el-empty description="暂无通知" />
									</el-tab-pane>
									<el-tab-pane label="消息(5)" name="message">
										<el-scrollbar max-height="330px">
											<template v-for="item in mockNotifyData.message" :key="item._id">
												<div class="message-container">
													<MessageList :message="item"></MessageList>
												</div>
											</template>
										</el-scrollbar>
									</el-tab-pane>
									<el-tab-pane label="待办(3)" name="todo">
										<el-scrollbar max-height="330px">
											<template v-for="item in mockNotifyData.todo" :key="item._id">
												<div class="message-container">
													<TodoList :message="item"></TodoList>
												</div>
											</template>
										</el-scrollbar>
									</el-tab-pane>
								</el-tabs>
							</template>
						</el-dropdown>
					</el-badge>
				</div>
				<div class="header-container-right-option option-avatar">
					<el-dropdown @command="handleAvatarOption">
						<div>
							<el-avatar>user</el-avatar>
							<span>&nbsp;&nbsp; 昊轩</span>
						</div>
						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item command="account-setting">
									<Icon name="icon-user"></Icon>
									<span>&nbsp;账户设置</span>
								</el-dropdown-item>
								<el-dropdown-item command="exit">
									<Icon name="icon-sign-out"></Icon>
									<span>&nbsp;退出系统</span>
								</el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>
				</div>
				<div class="header-container-right-option" @click="openSetting">
					<Icon name="icon-setting"></Icon>
				</div>
			</div>
		</div>
	</el-header>

	<Setting v-model="settingState"></Setting>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useFullscreen } from '@vueuse/core'
import { ElHeader, ElScrollbar, type DropdownInstance } from 'element-plus'
import notifyData from '@/Mock/header-notify'
import MessageList from './src/MessageList.vue'
import TodoList from './src/TodoList.vue'
import Setting from './src/Setting.vue'
import useSettingStore from '@/store/setting'
import { useRouter } from 'vue-router'

const router = useRouter()

const settingStore = useSettingStore()

const toggleSideCollapse = () => {
	settingStore.changeSideCollapse()
}

const toggleTheme = (e: MouseEvent) => {
	const { clientX, clientY } = e
	const transition = document.startViewTransition(() => {
		document.documentElement.classList.toggle('dark')
	})
	transition.ready.then(() => {
		const radius = Math.hypot(
			Math.max(clientX, innerWidth - clientX),
			Math.max(clientY, innerHeight - clientY)
		)
		const clipPath = [
			`circle(0% at ${clientX}px ${clientY}px)`,
			`circle(${radius}px at ${clientX}px ${clientY}px)`
		]
		const isDark = document.documentElement.classList.contains('dark')

		document.documentElement.animate(
			{
				clipPath: isDark ? clipPath.reverse() : clipPath
			},
			{
				duration: 500,
				pseudoElement: isDark
					? '::view-transition-old(root)'
					: '::view-transition-new(root)'
			}
		)
	})
}

const languageDropdown = ref<DropdownInstance>()

const openLanguage = () => {
	if (!languageDropdown.value) return
	languageDropdown.value.handleOpen()
}

const handleCommand = (command: string | number | object) => {
	// todo:切换多语言
}

const { isFullscreen, toggle } = useFullscreen()
const toggleFullScreen = () => {
	toggle()
}

import type { TabsPaneContext } from 'element-plus'

const mockNotifyData = reactive(notifyData)
const activeName = ref('message')
const handleTabClick = (tab: TabsPaneContext, event: Event) => {
	console.log(tab, event)
}

const bellRef = ref<DropdownInstance>()
const openBell = () => {
	if (!bellRef.value) return
	bellRef.value.handleOpen()
}

const settingState = ref(false)
const openSetting = () => {
	settingState.value = true
}

const handleAvatarOption = (command: string | number | object) => {
	if (command === 'account-setting') {
		router.push('/account-setting')
	} else {

	}

}

</script>

<style scoped lang="scss">
.header-container {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 100%;

	.header-title {
		margin-left: 30px;
	}

	.header-container-left {
		display: flex;
		height: 100%;
		align-items: center;
	}

	.header-container-right {
		display: flex;
		height: 100%;

		.header-container-right-option {
			display: flex;
			align-items: center;
			justify-content: center;
			min-width: 60px;

			&:hover {
				background-color: #f6f6f6;
			}

		}

		.option-avatar {
			padding: 5px;
		}

		.header-bell {
			padding: 0 20px;
		}

	}


}

:deep(.el-tabs__header) {
	margin: 0;
}
</style>
