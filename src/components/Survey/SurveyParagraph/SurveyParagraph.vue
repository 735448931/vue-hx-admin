<template>
    <div :class="props.isCenter ? 'isCenter' : 'isStart'">
        {{ props.text }}
    </div>
</template>

<script setup lang="ts">
import type { SurveyParagraphProps } from '.';

const props = withDefaults(defineProps<SurveyParagraphProps>(), {
    text: '一个段落',
    isCenter: false
})
</script>

<style scoped lang="scss">
.isCenter {
    text-align: center;
}

.isStart {
    text-align: start;
}
</style>