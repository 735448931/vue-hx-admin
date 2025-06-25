<template>
    <div>{{ props.title }}</div>
    <el-input :placeholder="props.placeholder" />
</template>

<script setup lang="ts">
import type { SurveyInputProps } from './index';

const props = withDefaults(defineProps<SurveyInputProps>(), {
    title: '输入框标题',
    placeholder: '请输入...'
})

</script>

<style scoped></style>