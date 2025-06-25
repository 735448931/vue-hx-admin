<template>
    <div>{{ props.title }}</div>
    <el-input :placeholder="props.placeholder" type="textarea" />
</template>

<script setup lang="ts">
import type { SurveyInputProps } from '../SurveyInput';

const props = withDefaults(defineProps<SurveyInputProps>(), {
    title: '文本框标题',
    placeholder: '请输入...'
})

</script>

<style scoped></style>