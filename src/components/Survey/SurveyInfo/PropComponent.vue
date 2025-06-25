<template>
    <el-form label-width="auto" :model="form" label-position="top">
        <el-form-item label="标题">
            <el-input v-model="form.text" />
        </el-form-item>
        <el-form-item label="描述">
            <el-input v-model="form.desc" />
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue'
import type { SurveyInfoProps } from './index';

defineOptions({
    inheritAttrs: false
})

const emits = defineEmits(['change'])

const props = defineProps<SurveyInfoProps>()

const form = reactive({
    text: props.text,
    desc: props.desc
})

watch(form, () => {
    emits('change', form)
})


</script>