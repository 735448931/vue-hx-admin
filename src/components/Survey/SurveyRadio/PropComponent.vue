<template>
    <el-form :disabled="props.isLocked" label-width="auto" :model="form" label-position="top">

        <el-form-item label="单选标题">
            <el-input v-model="form.title" />
        </el-form-item>

        <div>选项</div>
        <el-form-item style="width: 70%" v-for="(item, index) in form.options" :key="index">

            <div class="radio-option">
                <el-input v-model="item.text" />
                <el-button v-show="index !== 0" circle @click.prevent="removeItem(item)" class="remove-btn">
                    <Icon name="icon-close"></Icon>
                </el-button>
            </div>
        </el-form-item>

        <el-form-item>
            <div class="add-option">
                <el-button type="primary" @click="addItem">
                    <Icon name="icon-add-circle"></Icon> &nbsp;&nbsp;添加选项
                </el-button>
            </div>
        </el-form-item>
        <el-form-item label="默认选中">
            <el-select v-model="form.value" placeholder="Select">
                <el-option v-for="item in form.options" :key="item.value" :label="item.text" :value="item.value" />
            </el-select>
        </el-form-item>

        <el-form-item>
            <el-checkbox v-model="form.isVertical" label="竖向排列" />
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue'
import type { SurveyRadioProps } from '.';

const props = defineProps<SurveyRadioProps>()

const form = reactive({
    title: props.title,
    isVertical: props.isVertical,
    options: props.options || [],
    value: props.value
})

const removeItem = (item: any) => {
    const index = form.options.indexOf(item)
    if (index !== -1) {
        form.options.splice(index, 1)
    }

}


const addItem = () => {

    let optionLength = form.options.length + 1

    form.options.push({
        text: '选项' + optionLength,
        value: optionLength.toString(),
    })
}

defineOptions({
    inheritAttrs: false
})


const emits = defineEmits(['change'])


watch(form, () => {
    emits('change', form)
})



</script>

<style scoped>
.radio-option {
    display: flex;
}

.remove-btn {
    margin-left: 20px;
}

.add-option {
    width: 100%;
    display: flex;
    justify-content: center;
}
</style>