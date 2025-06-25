<template>
    <el-form label-width="auto" :model="form" label-position="top">
        <el-form-item label="段落内容">
            <el-input v-model="form.text" type="textarea" />
        </el-form-item>
        <el-form-item>
            <el-checkbox v-model="form.isCenter" label="居中显示" size="large" />
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue'
import type { SurveyParagraphProps } from '.';

const props = defineProps<SurveyParagraphProps>()

const form = reactive({
    text: props.text,
    isCenter: props.isCenter
})

defineOptions({
    inheritAttrs: false
})

const emits = defineEmits(['change'])


watch(form, () => {
    emits('change', form)
})
</script>