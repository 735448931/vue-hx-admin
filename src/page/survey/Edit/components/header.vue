<template>
    <div class="survey-edit-header">
        <div class="header-left">
            <el-button type="primary" @click="router.back()">返回</el-button>
            <div class="header-title">问卷标题</div>
        </div>

        <div class="header-center">
            <el-button circle @click="handleDelect">
                <Icon name="icon-shanchu"></Icon>
            </el-button>

            <el-button circle @click="handleLock">
                <Icon name="icon-lock"></Icon>
            </el-button>

            <el-button circle @click="handleCopy">
                <Icon name="icon-copy"></Icon>
            </el-button>

            <el-button circle @click="handlePaste">
                <Icon name="icon-paste"></Icon>
            </el-button>

            <el-button circle @click="handleChooseUp">
                <Icon name="icon-line_chevron_up"></Icon>
            </el-button>
            <el-button circle @click="handleChooseDown">
                <Icon name="icon-line_chevron_down"></Icon>
            </el-button>
            <el-button circle>
                <Icon name="icon-liuchenghuifu"></Icon>
            </el-button>
            <el-button circle>
                <Icon name="icon-huifu"></Icon>
            </el-button>

        </div>

        <div class="header-right">
            <el-button type="primary">保存</el-button>
            <el-button>发布</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import useSurveyStore from '@/store/survey';
import { useRouter } from 'vue-router';

const router = useRouter()

const surveyStore = useSurveyStore()

const handleDelect = () => {
    surveyStore.removeSelectedComponent()
}

const handleLock = () => {
    surveyStore.toggleComponentLocked()
}

const handleCopy = () => {
    surveyStore.copySelectedComponent()
}

const handlePaste = () => {
    surveyStore.pasteCopiedComponent()
}

const handleChooseUp = () => {
    surveyStore.selectPrevComponent()

}

const handleChooseDown = () => {
    surveyStore.selectNextComponent()
}

</script>

<style scoped lang="scss">
.survey-edit-header {
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;

    .header-left {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 300px;
    }

    .header-right {
        width: 300px;
        display: flex;
        justify-content: end;
    }


}
</style>