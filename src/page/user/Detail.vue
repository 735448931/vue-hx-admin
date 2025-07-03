<template>
    <el-dialog v-model="model" :title="props.type === 'edit' ? '编辑用户' : '新增用户'" width="500">
        <el-form :rules="rules" ref="detailFormRef" :model="detailForm" status-icon label-width="auto">
            <el-form-item v-if="props.id" label="ID" prop="_id">
                <el-input v-model="detailForm._id" disabled />
            </el-form-item>
            <el-form-item label="账号" prop="username">
                <el-input v-model="detailForm.username" placeholder="请输入..." />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="detailForm.password" type="password" show-password autocomplete="off"
                    placeholder="请输入..." />
            </el-form-item>
            <el-form-item v-if="!props.id" label="确认密码" prop="checkPassword">
                <el-input v-model="detailForm.checkPassword" type="password" show-password autocomplete="off"
                    placeholder="请输入..." />
            </el-form-item>
            <el-form-item label="用户昵称" prop="name">
                <el-input v-model="detailForm.name" placeholder="请输入..." />
            </el-form-item>
            <el-form-item label="状态" prop="status">
                <el-switch inline-prompt v-model="detailForm.status" active-text="启用" inactive-text="禁用"
                    active-value="enable" inactive-value="disabled" />
            </el-form-item>
            <el-form-item label="电话号码" prop="phone">
                <el-input v-model.number="detailForm.phone" placeholder="请输入..." />
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="detailForm.email" placeholder="请输入..." />
            </el-form-item>
        </el-form>
        <template #footer>
            <div>
                <el-button @click="handleCancel(detailFormRef)">取消</el-button>
                <el-button @click="handleConfirm(detailFormRef)" type="primary">
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { userCreateApi, userDetailApi, userUpdateApi } from '@/api/user'
import { excludeInvalidField } from '@/utils'

interface ModelProps {
    type: 'add' | 'edit'
    id?: string
}
const model = defineModel<boolean>()
const props = defineProps<ModelProps>()
const emits = defineEmits(['changeData'])

const detailFormRef = ref<FormInstance>()

const detailForm = reactive({
    _id: '',
    username: '',
    password: '',
    checkPassword: '',
    name: '',
    phone: null,
    email: '',
    status: 'enable' as any,
})

const confirmPassword = (rule: any, value: any, callback: any) => {
    if (value !== detailForm.password) {
        callback(new Error("两次的密码不匹配!"))
    } else {
        callback()
    }
}
const rules = reactive<FormRules<typeof detailForm>>({
    username: [{ required: true, min: 3, message: '必填选项最短为3', trigger: 'blur' }],
    password: [{ required: true, message: '密码长度为5-20位', min: 5, max: 20, trigger: 'blur' },],
    checkPassword: [{ required: true, message: '密码长度为5-20位', min: 5, max: 20, trigger: 'blur' },
    { validator: confirmPassword, trigger: 'blur' }
    ],
    name: [{ required: true, message: '必填选项', trigger: 'blur' }],
    phone: [{ required: true, message: '必填选项', trigger: 'blur' }],
    email: [{ required: true, message: '必填选项', trigger: 'blur' }],
    status: [{ required: true, message: '必填选项', trigger: 'blur' }],
})

const handleCancel = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    model.value = false
}

const handleConfirm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            if (props.type === 'add') {
                // 新增
                const query = excludeInvalidField(detailForm)
                await userCreateApi(query)
                emits('changeData')
                model.value = false
            } else {
                // 编辑
                if (props.id) {
                    const query = excludeInvalidField(detailForm)
                    await userUpdateApi(props.id, query)
                    emits('changeData')
                    model.value = false
                }
            }
        } else {
            console.log('保存失败!')
            model.value = false
        }
    })

}

onMounted(async () => {
    if (props.id) {
        const response = await userDetailApi(props.id)
        Object.assign(detailForm, response)
    }

})


</script>