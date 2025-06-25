<template>
    <div>{{ props.title }}</div>
    <el-checkbox-group>
        <el-space :wrap="true" :style="{ alignItems: props.isVertical ? 'start' : 'center' }"
            :direction="props.isVertical ? 'vertical' : 'horizontal'" :size="props.isVertical ? '1' : 'default'">
            <template v-for="item in props.list" :key="item.value">
                <el-checkbox :value="item.value" :label="item.text"></el-checkbox>
            </template>
        </el-space>
    </el-checkbox-group>
</template>

<script lang="ts" setup>
import type { SurveyCheckboxProps } from '.';


// 请注意，在使用 withDefaults 时，默认值为可变引用类型(如数组或对象) 应该封装在函数中，以避免意外修改和外部副作用。这样可以确保每个组件实例都获得默认值的自己的副本。在使用默认值解构时，这不是必要的。
const props = withDefaults(defineProps<SurveyCheckboxProps>(), {
    title: '多选标题',
    isVertical: false,
    list: () => [
        { value: '选项1', text: '选项1', checked: false },
        { value: '选项2', text: '选项2', checked: false },
        { value: '选项3', text: '选项3', checked: false }
    ]
})
</script>
