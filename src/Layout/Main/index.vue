<template>
	<div class="main-container">
		<el-main>
			<router-view />
		</el-main>
	</div>

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
}
</style>
