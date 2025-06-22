<template>
    <el-form :model="newFormInline" label-width="auto" style="max-width: 600px">
        <el-form-item label="角色名称">
            <el-input v-model="newFormInline.name" />
        </el-form-item>
        <el-form-item label="角色标识">
            <el-input v-model="newFormInline.identification" />
        </el-form-item>
        <el-form-item label="状态">
            <el-select v-model="newFormInline.status" placeholder="请选择状态">
                <el-option label="启用" value="enable" />
                <el-option label="禁用" value="disabled" />
            </el-select>
        </el-form-item>
        <el-form-item label="备注">
            <el-input v-model="newFormInline.desc" type="textarea" />
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

interface RoleDatailFormProps {
    formInline?: {
        name: string,
        identification: string,
        status: 'enable' | 'disabled'
        desc: string,
    }
}

const props = withDefaults(defineProps<RoleDatailFormProps>(), {
    formInline: () => ({
        name: '123',
        identification: '312',
        status: 'enable',
        desc: '52151',
    })
})

const newFormInline = ref(props.formInline);



const onSubmit = () => {
    console.log('submit!')
}
</script>
