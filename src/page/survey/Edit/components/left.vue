<template>
    <div class="left">
        <el-tabs :stretch="true" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="组件库" name="componentLib">
                <ComponentLib></ComponentLib>
            </el-tab-pane>
            <el-tab-pane label="图层" name="layer">
                <Layer></Layer>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import ComponentLib from './ComponentLib.vue'
import Layer from './Layer.vue'

const activeName = ref('componentLib')

const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
}
</script>

<style scoped lang="scss">
.left {
    width: 400px;
    border: 1px solid red;
    background-color: #fff;
}
</style>
