<template>
    <el-form label-width="auto" :model="form" label-position="top">

        <el-form-item label="标题内容">
            <el-input v-model="form.text" />
        </el-form-item>
        <el-form-item label="层级">
            <el-select v-model="form.level" placeholder="Select">
                <el-option label="1" :value="1" />
                <el-option label="2" :value="2" />
                <el-option label="3" :value="3" />
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-checkbox v-model="form.isCenter" label="居中显示" size="large" />
        </el-form-item>

    </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import type { SurveyTitleProps } from './index'

const props = defineProps<SurveyTitleProps>()


const form = reactive({
    text: props.text,
    level: props.level,
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