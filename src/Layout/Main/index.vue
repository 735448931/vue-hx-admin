<template>
	<el-main class="main-container">
		<router-view />
	</el-main>
</template>

<script setup lang="ts">
import useSettingStore from '@/store/setting';
const settingStore = useSettingStore()


</script>

<style scoped>
.main-container {
	width: 100%;
	background-color: #f6f6f6;
	height: calc(100vh - 100px);
	padding: 20px;
	border: 1px solid red;
}
</style>
