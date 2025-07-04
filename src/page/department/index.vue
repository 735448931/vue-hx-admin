<template>
    <div class="department-container">
        <div class="department-left">
            <el-input v-model="filterText" placeholder="请输入部门名称" />
            <el-tree :default-expanded-keys="defaultExpandedKeys" node-key="_id" ref="treeRef" :data="departmentData"
                :props="defaultProps" :filter-node-method="filterNode" />
        </div>

        <!-- 二次封装组件区域 -->
        <div class="department-right">
            <!-- <div class="right-top">
                <el-button>
                    <Icon name="icon-add-circle"></Icon> 新增角色
                </el-button>
                <el-tooltip content="刷新" placement="top">
                    <el-button circle class="refresh-btn">
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
</div> -->
            <div class="right-main">
                <DTable :data="tableData" :config="tableConfig" border>
                    <template #name_default="scope">
                        {{ scope.row.name }} +++
                    </template>
                    <template #action_default="scope">
                        <el-button @click="handleEdit(scope.row._id)">编辑</el-button>
                        <el-button @click="handleDelete(scope.row._id)">删除</el-button>
                    </template>
                </DTable>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import type { FilterNodeMethodFunction, TreeInstance } from 'element-plus'
import { departmentListApi } from '@/api/department'
import type { Department } from '@/api/interface/department'
import DTable from '@/components/Dcomponent/DTable/index.vue'
import { customerListApi } from '@/api/customer'
import { useRouter } from 'vue-router'

interface Tree {
    [key: string]: any
}

const filterText = ref('')
const treeRef = ref<TreeInstance>()
const defaultExpandedKeys = ref<any>()

const defaultProps = {
    children: 'children',
    label: 'label',
}

watch(filterText, (val) => {
    treeRef.value!.filter(val)
})

const filterNode: FilterNodeMethodFunction = (value: string, data: Tree) => {
    if (!value) return true
    return data.label.includes(value)
}


const departmentData = ref()

const getDepartmentData = async () => {
    const response = await departmentListApi()
    departmentData.value = generate(response.data)
    defaultExpandedKeys.value = [departmentData.value[0].children[0]._id]
}

const generate = (departmentArray: Department[]) => {
    let result: any[] = []

    departmentArray.forEach(department => {
        if (department.level === 1) {
            result.push({
                _id: department._id,
                label: department.name,
                children: []
            })
        }
    })

    let children = departmentArray.filter(item => item.level !== 1)
    children.sort((a, b) => (a.level - b.level))
    children.forEach(child => {
        result.forEach(parent => {
            if (parent._id === child.parent) {
                parent.children.push({
                    _id: child._id,
                    label: child.name
                })
            }
        })
    })

    return result
}

onMounted(async () => {
    await getDepartmentData()
})


// table 相关
const tableData = ref([])
const tableConfig = ref([
    {
        prop: 'name',
        label: '姓名',
        attrs: {
            width: 100
        },
    },
    {
        prop: 'age',
        label: '年龄',
        attrs: {
            width: 80
        }
    },
    {
        prop: 'tag',
        label: '标签',
    },
    {
        prop: 'area',
        label: '地区',
    },
    {
        prop: 'able',
        label: '能力',
    },
    {
        prop: 'appointment',
        label: '预约日期',
    },
    {
        prop: 'sex',
        label: '性别',
    },
    {
        prop: 'level',
        label: '级别',
    },
    {
        prop: 'status',
        label: '状态',
    },
    {
        prop: 'time',
        label: '时间',
    },
    {
        prop: 'memo',
        label: '备注',
    },
    {
        prop: 'action',
        label: '操作',
    },
])
const router = useRouter()

const handleEdit = (id: string) => {
    router.push(`/department/${id}`)
}

const handleDelete = (id: string) => {

}


const getCustomerData = async () => {
    const res: any = await customerListApi()
    tableData.value = res.data
}



onMounted(async () => {
    await getCustomerData()
})

</script>


<style lang="scss" scoped>
.department-container {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;

    .department-left {
        min-width: 300px;
        height: 100%;

        .el-tree {
            height: 95%;
        }
    }

    .department-right {
        margin: 0 20px;
        flex: 1;
        height: 100%;
        border: 1px solid red;
    }
}
</style>