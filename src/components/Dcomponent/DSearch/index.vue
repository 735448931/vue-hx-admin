<template>
    <el-form ref="formRef" :model="model" label-width="auto" :rules="rules">
        <el-form-item v-for="item in items" :label="item.label" :prop="item.prop">
            <slot :name="item.prop">
                <template v-if="item.ctype === 'checkbox'">
                    <el-checkbox-group v-model="model[item.prop]" v-bind="getGroupProps(item)">
                        <template v-for="option in item.options" :key="option.value">
                            <el-checkbox :label="option.label" :value="option.value" />
                        </template>
                    </el-checkbox-group>
                </template>

                <template v-else-if="item.ctype === 'radio'" v-model="model[item.prop]">
                    <el-radio-group v-model="model[item.prop]" v-bind="getGroupProps(item)">
                        <template v-for="option in item.options" :key="option.value">
                            <el-radio :value="option.value">{{ option.label }}</el-radio>
                        </template>
                    </el-radio-group>
                </template>

                <template v-else-if="item.ctype === 'select'" v-model="model[item.prop]">
                    <el-select v-model="model[item.prop]" v-bind="getGroupProps(item)">
                        <template v-for="option in item.options" :key="option.value">
                            <el-option :label="option.label" :value="option.value"></el-option>
                        </template>
                    </el-select>
                </template>

                <template v-else>
                    <component :is="getComponent(item)" v-model="model[item.prop]" v-bind="getItemProps(item)">
                    </component>
                </template>
            </slot>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { computed, useTemplateRef } from 'vue'
import { ElCascader, ElCheckbox, ElCheckboxGroup, ElDatePicker, ElInput, ElInputNumber, ElInputTag, ElRadio, ElSelect, ElSwitch, ElTimePicker, type FormRules } from 'element-plus';
import { omit } from 'lodash-es';

const componentMap: Record<string, any> = {
    'input': ElInput,
    'input-number': ElInputNumber,
    'input-tag': ElInputTag,
    'checkbox': ElCheckboxGroup,
    'select': ElSelect,
    'cascader': ElCascader,
    'radio': ElRadio,
    'switch': ElSwitch,
    'date-picker': ElDatePicker,
    'time-picker': ElTimePicker,
}

const formInstance = useTemplateRef('formRef')
const model = defineModel<Record<string, any>>({ required: true })

interface DFormProps {
    formItems: any,
    rules: any
}

const props = defineProps<DFormProps>()


const items = computed(() => props.formItems.filter((item: any) => {
    return !item.hidden
}))

const rootProps = ['label', 'prop', 'ctype']

const getItemProps = (item: any) => {
    if (item.props) return item.props
    return omit(item, rootProps)
}

const getComponent = (item: any) => {
    const { ctype } = item

    if (typeof ctype !== 'string') {
        return ctype
    }

    return componentMap[ctype]
}

const getGroupProps = (item: any) => {
    return omit(item, [...rootProps, item.options])
}





// todo：option
defineExpose({
    validate(cb: any) {
        return formInstance.value?.validate(cb)
    },
    resetFields() {
        return formInstance.value?.resetFields()
    }
})



</script>