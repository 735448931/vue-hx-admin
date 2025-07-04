<template>

    <div class="top">
        <div class="top-left">
            <h2>编辑客户</h2>
        </div>
        <div class="top-right">
            <el-button @click="router.back()">返回</el-button>
            <el-button type="primary" @click="onSave()">保存</el-button>
            <el-button type="danger" @click="onReset()">重置</el-button>
        </div>
    </div>
    <el-divider />
    <div class="form-container">
        <DForm ref="formRef" v-model="data" :form-items="formItems" :rules="rules">
        </DForm>
    </div>
    <el-button @click="onSubmit">校验</el-button>
</template>

<script setup lang="ts">
import DForm from '@/components/Dcomponent/DForm/index.vue'
import { computed, reactive, ref, useTemplateRef } from 'vue';
import Test from './test.vue';
import { useRouter } from 'vue-router';
import type { FormRules } from 'element-plus';

const router = useRouter()

const onSave = () => {

}

const onReset = () => {

}

const data = ref({
    _id: undefined,
    name: undefined,
    age: undefined,
    tag: undefined,
    area: undefined,
    able: undefined,
    appointment: undefined,
    memo: undefined,
    sex: undefined,
    level: undefined,
    status: undefined,
    time: undefined,
})
const options = [
    {
        value: 'guide',
        label: 'Guide',
        children: [
            {
                value: 'disciplines',
                label: 'Disciplines',
                children: [
                    {
                        value: 'consistency',
                        label: 'Consistency',
                    },
                    {
                        value: 'feedback',
                        label: 'Feedback',
                    },
                ],
            },
            {
                value: 'navigation',
                label: 'Navigation',
                children: [
                    {
                        value: 'side nav',
                        label: 'Side Navigation',
                    },
                    {
                        value: 'top nav',
                        label: 'Top Navigation',
                    },
                ],
            },
        ],
    },
    {
        value: 'component',
        label: 'Component',
        children: [
            {
                value: 'basic',
                label: 'Basic',
                children: [
                    {
                        value: 'icon',
                        label: 'Icon',
                    },
                    {
                        value: 'button',
                        label: 'Button',
                    },
                ],
            },
            {
                value: 'form',
                label: 'Form',
                children: [
                    {
                        value: 'rate',
                        label: 'Rate',
                    },
                    {
                        value: 'form',
                        label: 'Form',
                    },
                ],
            },
        ],
    },
    {
        value: 'resource',
        label: 'Resource',
        children: [
            {
                value: 'axure',
                label: 'Axure Components',
            },
            {
                value: 'sketch',
                label: 'Sketch Templates',
            },
            {
                value: 'docs',
                label: 'Design Documentation',
            },
        ],
    },
]


const formItems = computed(() => {
    return [
        // {
        //     label: '名称',
        //     prop: 'name',
        //     type: Test,
        //     placeholder: '请输入名称',
        //     focus() {
        //         console.log('聚焦了');
        //     }
        // },
        {
            label: 'ID',
            prop: '_id',
            ctype: 'input'
        },
        {
            label: '名称',
            prop: 'name',
            ctype: 'input',
            placeholder: '请输入名称',
        },
        {
            label: '年龄',
            prop: 'age',
            ctype: 'input-number',
        },
        {
            label: '标签',
            prop: 'tag',
            ctype: 'input-tag',
        },
        {
            label: '地区',
            prop: 'area',
            ctype: 'cascader',
            options: options
        },
        {
            label: '能力',
            prop: 'able',
            ctype: 'checkbox', // group 
            options: [
                {
                    label: 'vue',
                    value: 'vue'
                },
                {
                    label: 'react',
                    value: 'react'
                },
                {
                    label: 'angular',
                    value: 'angular'
                }
            ]
        },
        {
            label: '性别',
            prop: 'sex',
            ctype: 'radio', // group 
            options: [
                {
                    label: '男',
                    value: 'man'
                },
                {
                    label: '女',
                    value: 'woman'
                },
            ]
        },
        {
            label: '等级',
            prop: 'level',
            ctype: 'select',
            options: [
                {
                    label: 1,
                    value: 1
                },
                {
                    label: 2,
                    value: 2
                },
                {
                    label: 3,
                    value: 3
                }
            ]
        },
        {
            label: '状态',
            prop: 'status',
            ctype: 'switch',
            activeText: '启用',
            inactiveText: '禁用',
        },
        {
            label: '预约日期',
            prop: 'appointment',
            ctype: 'date-picker',
            rangeSeparator: "To",
            startPlaceholder: "Start date",
            endPlaceholder: "End date",
            type: "daterange"
        },
        {
            label: '预约事件',
            prop: 'time',
            ctype: 'time-picker'
        },
        {
            label: '备注',
            prop: 'memo',
            ctype: 'input',
            type: "textarea"
        },
    ]
})

const formInstance = useTemplateRef('formRef')
const rules = reactive<FormRules<typeof data>>({
    name: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
})

const onSubmit = async () => {
    await formInstance.value?.validate((valid: any, fields: any) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!', fields)
        }
    })
}
</script>

<style scoped lang="scss">
.top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    padding: 0 50px;
}

.form-container {
    margin: 20px 200px;
    width: 400px;
}
</style>