<template>
    <div class="search-form">
        <el-form @keyup.enter="onSearch" label-width="80" ref="userSearchRef" :inline="true" :model="userSearchForm">
            <el-form-item label="用户名称" prop="username">
                <el-input v-model="userSearchForm.username" placeholder="请输入用户名称" clearable />
            </el-form-item>
            <el-form-item label="手机号码" prop="phone">
                <el-input v-model="userSearchForm.phone" placeholder="请输入用户名称" clearable />
            </el-form-item>
            <el-form-item label="状态" prop="status">
                <el-select v-model="userSearchForm.status" placeholder="请选择" clearable>
                    <el-option label="启用" value="enable" />
                    <el-option label="禁用" value="disabled" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSearch">
                    <Icon name="icon-search"></Icon>搜索
                </el-button>
                <el-button @click="onReset(userSearchRef)">
                    <Icon name="icon-Reset"></Icon>重置
                </el-button>
            </el-form-item>
        </el-form>
    </div>

    <div class="table-container">
        <div class="table-header">
            <div class="header-left">
                <h3>用户管理</h3>
            </div>
            <div class="header-right">
                <el-button @click="showDetail('add')">
                    <Icon name="icon-add-circle"></Icon> 新增角色
                </el-button>
                <el-tooltip content="刷新" placement="top">
                    <el-button circle class="refresh-btn" @click="getUserData({ page: 1, pageSize: 10 })">
                        <Icon name="icon-refresh"></Icon>
                    </el-button>
                </el-tooltip>

                <el-dropdown>
                    <el-button circle>
                        <Icon name="icon-setting"></Icon>
                    </el-button>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>其余功能部门页展示</el-dropdown-item>
                            <el-dropdown-item>其余功能部门页展示</el-dropdown-item>
                            <el-dropdown-item>其余功能部门页展示</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
        <div class="table-main">
            <el-table v-loading="loading" highlight-current-row size="small" border ref="multipleTableRef"
                :data="userData" row-key="_id" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="60" />
                <el-table-column label="用户头像">
                    <template #default="scope">
                        <el-image class="user-avatar" lazy preview-teleported :src="scope.row.avatar" />
                    </template>
                </el-table-column>
                <el-table-column resizable property="username" label="用户名称" />
                <el-table-column resizable property="name" label="用户昵称" />
                <el-table-column resizable property="status" label="状态">
                    <template #default="scope">
                        <el-switch disabled inline-prompt v-model="scope.row.status" active-text="启用" inactive-text="禁用"
                            active-value="enable" inactive-value="disabled" />
                    </template>
                </el-table-column>
                <el-table-column resizable property="email" label="邮箱" />
                <el-table-column resizable property="phone" label="电话" />
                <el-table-column resizable property="createdAt" label="创建时间" />
                <el-table-column resizable property="action" label="操作" min-width="120px">
                    <template #default="scope">
                        <el-button @click="showDetail('edit', scope.row._id)" type="primary" plain>编辑</el-button>
                        <el-popconfirm title="你确认要删除这条数据吗?" @confirm="handleDelete(scope.row._id)">
                            <template #reference>
                                <el-button type="danger" plain>删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="table-footer">
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 50]"
                layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="getUserData()"
                @current-change="getUserData()" />
        </div>

        <!-- <Detail v-if="showUserModal" v-model="showUserModal" :type="modalType" :id="modalId"
                @change-data="getUserData()">
            </Detail> -->
    </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { onMounted, reactive, ref, toRaw, h } from 'vue'
import { ElNotification } from 'element-plus'
import type { TableInstance } from 'element-plus'
import type { User } from '@/api/interface/user'
import { userDeleteApi, userListApi } from '@/api/user'
import { excludeInvalidField } from '@/utils'
import Detail from './Detail.vue'
// 搜索栏
const userSearchRef = ref<FormInstance>()
const userSearchForm = reactive({
    username: '',
    phone: '',
    status: '',
})

const onSearch = async () => {
    const serachQuery = excludeInvalidField(toRaw(userSearchForm))
    const query = { filter: serachQuery }
    await getUserData(query)
}

const onReset = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

// table
const loading = ref<boolean>(false)
const multipleTableRef = ref<TableInstance>()
const multipleSelection = ref<User[]>([])
const userData = ref<User[]>([])
// todo:多选
const handleSelectionChange = (val: User[]) => {
    multipleSelection.value = val
}


const handleDelete = async (id: string) => {
    await userDeleteApi(id)
    ElNotification({
        title: '提示',
        message: h('i', { style: 'color: teal' }, '删除成功'),
    })
    await getUserData()
}

// 加载用户信息
const getUserData = async (query?: any) => {
    loading.value = true
    const response = await userListApi({ page: currentPage.value, pageSize: pageSize.value, ...query })
    userData.value = response.data
    total.value = response.total
    setTimeout(() => {
        loading.value = false
    }, 500);
}

// pagination
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

onMounted(async () => {
    await getUserData()
})

// 模态框
const showUserModal = ref(false)
const modalType = ref<'add' | 'edit'>('add')
const modalId = ref<string>()
const showDetail = (type: 'add' | 'edit', id?: string) => {
    modalType.value = type
    if (id) {
        modalId.value = id
    }
    showUserModal.value = true
}
</script>

<style scoped lang="scss">
.search-form {
    background-color: #fff;
    padding: 10px;

    .el-input {
        --el-input-width: 220px;
    }

    .el-select {
        --el-select-width: 220px;
    }
}

.table-container {
    padding: 10px;
    background-color: #fff;

    .table-header {
        display: flex;
        justify-content: space-between;
    }
}

.refresh-btn {
    margin: 0 10px;
}

.user-avatar {
    width: 50px;
    height: 50px;
}
</style>