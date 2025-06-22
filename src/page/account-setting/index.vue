<template>
    <el-tabs tab-position="top" class="demo-tabs">
        <el-tab-pane label="个人信息">
            <el-form :model="form" label-width="auto" style="max-width: 400px">

                <el-form-item label="头像">
                    <el-avatar v-model="form.avatar" size="large">
                        user
                    </el-avatar>

                    <el-button @click="openAvatarDialog" type="primary" plain class="btn">
                        <Icon name="icon-shangchuan"></Icon>
                        更新头像
                    </el-button>

                </el-form-item>
                <el-form-item label="昵称">
                    <el-input v-model="form.name" />
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="form.email" />
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input v-model="form.phone" />
                </el-form-item>
                <el-form-item label="简介">
                    <el-input v-model="form.desc" type="textarea" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">更新信息</el-button>
                </el-form-item>
            </el-form>

        </el-tab-pane>
        <el-tab-pane label="偏好设置">
            <div>
                <div>账户密码</div>
                <div>其他用户的消息将以站内信的形式通知</div>
            </div>
            <div>
                <div>系统消息</div>
                <div>系统消息将以站内信的形式通知</div>
            </div>
            <div>
                <div>待办任务</div>
                <div>待办任务将以站内信的形式通知</div>
            </div>
        </el-tab-pane>
        <el-tab-pane label="安全日志">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="details" label="详情" width="180" />
                <el-table-column prop="IP" label="IP地址" width="180" />
                <el-table-column prop="address" label="地点" />
                <el-table-column prop="system" label="操作系统" />
                <el-table-column prop="browser" label="浏览器类型" />
                <el-table-column prop="createdAt" label="时间" />
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="账户管理">账户管理</el-tab-pane>
    </el-tabs>

    <uploadAvatar v-model="showAvatarDialog" />
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';

import uploadAvatar from './src/uploadAvatar.vue';

const tableData = [
    {
        details: '账户登录',
        IP: '192.168.0.14',
        address: '中国河南省信阳市',
        system: 'macOS',
        browser: 'Chrome',
        createdAt: '2025-06-18 15:18:21',
    },
    {
        details: '绑定手机号',
        IP: '234.168.0.14',
        address: '中国辽宁省大连市',
        system: 'Ubuntu',
        browser: 'Firefox',
        createdAt: '2025-06-15 15:21:21',
    },
]


const showAvatarDialog = ref<boolean>(false)
const openAvatarDialog = () => {
    showAvatarDialog.value = true
}

const form = reactive({
    name: '昊轩',
    email: '735448931@qq.com',
    phone: '16618800000',
    desc: '一个热爱开源的前端工程师',
    avatar: ''
})

const onSubmit = () => {
    console.log('submit!')
}

</script>

<style>
.demo-tabs>.el-tabs__content {
    padding: 20px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}

.btn {
    margin-left: 20px;
}
</style>
