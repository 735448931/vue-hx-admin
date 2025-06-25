<template>
    <div>{{ props.title }}</div>
    <el-radio-group v-model="props.value">
        <el-space :wrap="true" :style="{ alignItems: props.isVertical ? 'start' : 'center' }"
            :direction="props.isVertical ? 'vertical' : 'horizontal'" :size="props.isVertical ? '1' : 'default'">
            <template v-for="item in props.options" :key="item.value">
                <el-radio :value="item.value" :label="item.text"></el-radio>
            </template>
        </el-space>
    </el-radio-group>
</template>

<script lang="ts" setup>
import type { SurveyRadioProps } from './index';

const props = withDefaults(defineProps<SurveyRadioProps>(), {
    title: '单选标题',
    isVertical: false,
    value: '',
    options: () => [
        { value: '1', text: '选项1' },
        { value: '2', text: '选项2' },
        { value: '3', text: '选项3' }
    ],
})



</script>


<style lang="scss" scoped>
.el-radio-group {
    width: 100%;
}
</style>