<template>
    <el-form label-width="auto" :model="form" label-position="top">
        <el-form-item label="标题">
            <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="占位符">
            <el-input v-model="form.placeholder" />
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue'
import type { SurveyTextareaProps } from '.';

const props = defineProps<SurveyTextareaProps>()

const form = reactive({
    title: props.title,
    placeholder: props.placeholder
})


defineOptions({
    inheritAttrs: false
})

const emits = defineEmits(['change'])


watch(form, () => {
    emits('change', form)
})
</script>