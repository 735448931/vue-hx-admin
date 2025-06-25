<template>
    <div class="container">
        <h2>{{ props.text }}</h2>
        <div>{{ props.desc }}</div>
    </div>
</template>

<script setup lang="ts">
import type { SurveyInfoProps } from './index';

const props = withDefaults(defineProps<SurveyInfoProps>(), {
    text: '问卷标题',
    desc: '问卷描述'
})


</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 10px;
}
</style>