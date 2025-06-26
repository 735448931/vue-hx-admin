<template>
	<el-aside :width=asideWidth>
		<el-menu :collapse-transition="false" unique-opened :collapse="settingStore.sideIsCollapse"
			default-active="/dashboard" router @open="handleOpen" @close="handleClose">
			<template v-for="item in MockMenu" :key="item.index">
				<!-- 一级菜单 -->
				<template v-if="!item.children">
					<el-menu-item :index="item.index">
						<template #title>
							{{ item.comment }}
						</template>
					</el-menu-item>
				</template>
				<!-- 二级菜单 -->
				<template v-else>
					<el-sub-menu :index="item.index">
						<template #title>
							<span>{{ item.comment }}</span>
						</template>
						<template v-for="child in item.children" :key="child.index">
							<el-menu-item :index="child.index">{{ child.comment }}</el-menu-item>
						</template>
					</el-sub-menu>
				</template>
			</template>
		</el-menu>
	</el-aside>
</template>

<script setup lang="ts">
import MockMenu from '@/Mock/menu'
import useSettingStore from '@/store/setting';
import { computed } from 'vue';

const settingStore = useSettingStore()

const asideWidth = computed(() => {
	return settingStore.sideIsCollapse ? '0px' : '200px'
})

const handleOpen = (key: string, keyPath: string[]) => {
	console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
	console.log(key, keyPath)
}

</script>

<style scoped>
.el-menu {
	height: calc(100vh - 60px);
}
</style>
