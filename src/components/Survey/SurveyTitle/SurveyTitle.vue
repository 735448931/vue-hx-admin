<template>
    <h4 :style="styleObject" :class="props.isCenter ? 'isCenter' : 'isStart'">
        {{ props.text }}
    </h4>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { type SurveyTitleProps } from './index';


const props = withDefaults(defineProps<SurveyTitleProps>(), {
    text: '一行标题',
    level: 1,
    isCenter: false
})

const genFontSize = (level: number) => {
    const sizeMap: Record<number, string> = {
        1: '24px',
        2: '20px',
        3: '16px',
    };
    return sizeMap[level] || '16px';
};

const styleObject = computed(() => {
    return {
        fontSize: genFontSize(props.level),
    }
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