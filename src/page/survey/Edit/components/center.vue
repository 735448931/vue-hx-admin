<template>
    <div class="center">
        <el-scrollbar>
            <VueDraggable ref="el" v-model="surveyStore.componentList" :animation="150" ghostClass="ghost">
                <template v-for="(item, index) in surveyStore.componentList" :key="index">
                    <div :style="{ border: item.fe_id === surveyStore.selectedId ? '1px solid #1890ff' : '1px solid #f7f7f7' }"
                        class="survey-item" @click="handleChoose(item.fe_id)">
                        <component :key="item.fe_id" :is="genComponent(item.type)" v-bind="item.props">
                        </component>
                    </div>
                </template>
            </VueDraggable>
        </el-scrollbar>
    </div>
</template>

<script setup lang="ts">
import { getComponentConfByType } from '@/components/Survey';
import useSurveyStore from '@/store/survey';
import { VueDraggable } from 'vue-draggable-plus'

const surveyStore = useSurveyStore()

const genComponent = (type: string) => {
    const res = getComponentConfByType(type)
    return res?.component
}

const handleChoose = (fe_id: string) => {
    surveyStore.selectedId = fe_id
}



</script>

<style scoped lang="scss">
.center {
    background-color: #fff;
    width: 400px;
    height: 800px;
    margin: auto 0;
    padding: 10px;

    .survey-item {
        margin-bottom: 12px;
        background-color: #f7f7f7;
        padding: 10px;
        border-radius: 3px;

        &:hover {
            border-color: #d9d9d9;
        }
    }
}

.ghost {
    opacity: 0.5;
    background: #c8ebfb;
}
</style>