<template>
    <div class='prop-component-container'>
        <template v-if="!surveyStore.selectedId">
            <div class="no-component">未选中组件</div>
        </template>

        <template v-else>
            <component :key="surveyStore.selectedId" :is="genarateComponent()" v-bind="genarateProps()"
                @change="changeProps"></component>
        </template>
    </div>
</template>

<script setup lang="ts">
import useSurveyStore from '@/store/survey';
import { getComponentConfByType, type ComponentProps } from '@/components/Survey';

const surveyStore = useSurveyStore()

const genarateComponent = () => {
    const selectedComponent = surveyStore.componentList.find((component) => {
        return component.fe_id === surveyStore.selectedId
    })
    if (!selectedComponent) return

    const findComponentConf = getComponentConfByType(selectedComponent.type)
    return findComponentConf?.propComponent

}


const genarateProps = () => {
    const selectedComponent = surveyStore.componentList.find((component) => {
        return component.fe_id === surveyStore.selectedId
    })

    if (!selectedComponent) return

    return selectedComponent.props
}

const changeProps = (newProps: ComponentProps) => {

    const selectedComponent = surveyStore.componentList.find((component) => {
        return component.fe_id === surveyStore.selectedId
    })

    if (!selectedComponent) return

    surveyStore.changeComponentProps({ fe_id: selectedComponent.fe_id, newProps })

}
</script>

<style scoped>
.prop-component-container {
    padding: 20px;
}

.no-component {
    text-align: center;
}
</style>