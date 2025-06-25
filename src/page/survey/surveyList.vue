<template>
    <el-table :data="tableData" style="width: 100%" height="800">
        <el-table-column prop="title" label="问卷标题" width="180" />
        <el-table-column prop="isPublished" label="isPublished" width="180" />
        <el-table-column prop="回答人数" label="回答人数" />
        <el-table-column label="Operations">
            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
                    编辑
                </el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
                    删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>


    <div>
        <el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4"
            :page-sizes="[100, 200, 300, 400]" :size="size" :disabled="disabled" :background="background"
            layout="total, sizes, prev, pager, next, jumper" :total="400" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
    </div>
</template>

<script lang="ts" setup>

import { ref } from 'vue'
import type { ComponentSize } from 'element-plus'
import { useRouter } from 'vue-router'


const currentPage4 = ref(4)
const pageSize4 = ref(100)
const size = ref<ComponentSize>('default')
const background = ref(false)
const disabled = ref(false)

const router = useRouter()

const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`)

}
const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
}

const handleEdit = (index: number, row: any) => {
    console.log('a', index);
    console.log('b', row);
    router.push('/survey/123')
}

const handleDelete = (index: number, row: any) => {

}

const tableData = [
    {
        title: '问卷1',
        isPublished: 'publish',
        回答人数: 23,
    },
    {
        title: '问卷2',
        isPublished: 'unpublish',
        回答人数: 32,
    },
    {
        title: '问卷3',
        isPublished: 'publish',
        回答人数: 543,
    },
    {
        title: '问卷4',
        isPublished: 'unpublish',
        回答人数: 432,
    },
    {
        title: '问卷1',
        isPublished: 'publish',
        回答人数: 23,
    },
    {
        title: '问卷2',
        isPublished: 'unpublish',
        回答人数: 32,
    },
    {
        title: '问卷3',
        isPublished: 'publish',
        回答人数: 543,
    },
    {
        title: '问卷4',
        isPublished: 'unpublish',
        回答人数: 432,
    },
    {
        title: '问卷1',
        isPublished: 'publish',
        回答人数: 23,
    },
    {
        title: '问卷2',
        isPublished: 'unpublish',
        回答人数: 32,
    },
    {
        title: '问卷3',
        isPublished: 'publish',
        回答人数: 543,
    },
    {
        title: '问卷4',
        isPublished: 'unpublish',
        回答人数: 432,
    },
    {
        title: '问卷1',
        isPublished: 'publish',
        回答人数: 23,
    },
    {
        title: '问卷2',
        isPublished: 'unpublish',
        回答人数: 32,
    },
    {
        title: '问卷3',
        isPublished: 'publish',
        回答人数: 543,
    },
    {
        title: '问卷4',
        isPublished: 'unpublish',
        回答人数: 432,
    },
    {
        title: '问卷1',
        isPublished: 'publish',
        回答人数: 23,
    },
    {
        title: '问卷2',
        isPublished: 'unpublish',
        回答人数: 32,
    },
    {
        title: '问卷3',
        isPublished: 'publish',
        回答人数: 543,
    },
    {
        title: '问卷4',
        isPublished: 'unpublish',
        回答人数: 432,
    },
    {
        title: '问卷1',
        isPublished: 'publish',
        回答人数: 23,
    },
    {
        title: '问卷2',
        isPublished: 'unpublish',
        回答人数: 32,
    },
    {
        title: '问卷3',
        isPublished: 'publish',
        回答人数: 543,
    },
    {
        title: '问卷4',
        isPublished: 'unpublish',
        回答人数: 432,
    },
    {
        title: '问卷2',
        isPublished: 'unpublish',
        回答人数: 32,
    },
    {
        title: '问卷3',
        isPublished: 'publish',
        回答人数: 543,
    },
    {
        title: '问卷4',
        isPublished: 'unpublish',
        回答人数: 432,
    },
    {
        title: '问卷2',
        isPublished: 'unpublish',
        回答人数: 32,
    },
    {
        title: '问卷3',
        isPublished: 'publish',
        回答人数: 543,
    },
    {
        title: '问卷4',
        isPublished: 'unpublish',
        回答人数: 432,
    },
    {
        title: '问卷2',
        isPublished: 'unpublish',
        回答人数: 32,
    },
    {
        title: '问卷3',
        isPublished: 'publish',
        回答人数: 543,
    },
    {
        title: '问卷4',
        isPublished: 'unpublish',
        回答人数: 432,
    },

]
</script>
