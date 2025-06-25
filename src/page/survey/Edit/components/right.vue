<template>
    <div class="right">
        <el-tabs :stretch="true" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="属性" name="first">
                <PropComponent></PropComponent>
            </el-tab-pane>
            <el-tab-pane label="页面设置" name="second">页面设置</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import PropComponent from './PropComponent.vue'

const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
}
</script>

<style scoped lang="scss">
.right {
    width: 400px;
    border: 1px solid red;
}
</style>
