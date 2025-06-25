<template>
    <div class="component-lib">
        <template v-for="(item, index) in componentConfGroup" :key="index">
            <div class="component-lib-header">
                <h3>{{ item.groupName }}</h3>
            </div>
            <template v-for="component in item.components">
                <div class="component-lib-wrapper" @click="handleClick(component)">
                    <div class="component-lib-component">
                        <component :is="component.component"></component>
                    </div>
                </div>
            </template>
        </template>
    </div>
</template>

<script setup lang="ts">
import { componentConfGroup, type ComponentConf } from '@/components/Survey';
import useSurveyStore from '@/store/survey';
import { nanoid } from 'nanoid'

const surveyStore = useSurveyStore()

const handleClick = (component: ComponentConf) => {
    surveyStore.addComponent({
        fe_id: nanoid(),
        title: component.title,
        type: component.type,
        props: component.defaultProps
    })

}
</script>

<style scoped lang="scss">
.component-lib {
    padding: 0px 10px;

    .component-lib-header {
        margin: 20px 0;
    }

    .component-lib-wrapper {
        margin-bottom: 12px;
        cursor: pointer;
        background-color: #f7f7f7;
        border: 1px solid #f7f7f7;
        padding: 10px;
        border-radius: 3px;

        &:hover {
            border-color: #d9d9d9;
        }

        .component-lib-component {
            pointer-events: none; // 屏蔽鼠标的行为
        }
    }
}
</style>