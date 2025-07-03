<template>
  <div>
    <vxe-form v-bind="formOptions" v-on="formEvents"></vxe-form>

    <div class="toolbar">
      <el-button>
        <Icon name="icon-add-circle"></Icon> 新增角色
      </el-button>
      <el-button circle>
        <Icon name="icon-refresh"></Icon>
      </el-button>
      <el-dropdown>
        <el-button circle>
          <Icon name="icon-setting"></Icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <vxe-table border show-overflow height="500" :data="tableData">
      <vxe-column type="seq" width="70"></vxe-column>
      <vxe-column field="name" title="角色名称"></vxe-column>
      <vxe-column field="identification" title="角色标识"></vxe-column>
      <vxe-column field="status" title="状态"></vxe-column>
      <vxe-column field="desc" title="备注"></vxe-column>
      <vxe-column field="createdAt" title="创建时间"></vxe-column>
      <vxe-column field="action" title="操作">
        <template #default="{ row }">
          <el-button type="primary" @click="handleEdit(row._id)">编辑</el-button>
          <el-button type="danger" @click="handleDel(row._id)">删除</el-button>
        </template>
      </vxe-column>
    </vxe-table>

    <el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4" :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper" :total="400" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, h } from 'vue'
import type { VxeFormProps, VxeFormListeners } from 'vxe-pc-ui'
import { useDialog } from '@/components/Dcomponent/DDialog/useDialog'
import { VxeUI, type VxeToolbarPropTypes, type VxeToolbarEvents } from 'vxe-table'
import DetailForm from './detailForm.vue'
const { addDialog } = useDialog()
interface RoleTable {
  _id: string
  name: string
  identification: string
  status: string
  desc: string
  createdAt: string
}

interface RoleFormData {
  name: string
  identification: string
  status: string
}

const tableData = ref<RoleTable[]>([
  { _id: '10001', name: 'Test1', identification: 'Develop', status: 'disabled', desc: '111', createdAt: '2025-06-20 17:50:30' },
  { _id: '10002', name: 'Test2', identification: 'Test', status: 'enable', desc: '222', createdAt: '2025-06-20 17:50:30' },
  { _id: '10003', name: 'Test3', identification: 'PM', status: 'disabled', desc: '333', createdAt: '2025-06-20 17:50:30' },
  { _id: '10004', name: 'Test4', identification: 'Designer', status: 'enable', desc: '444', createdAt: '2025-06-20 17:50:30' }
])

const formOptions = reactive<VxeFormProps<RoleFormData>>({
  data: {
    name: '',
    identification: '',
    status: ''
  },
  items: [
    { field: 'name', title: '角色名称', span: 8, itemRender: { name: 'VxeInput' } },
    { field: 'email', title: '角色标识', span: 8, itemRender: { name: 'VxeInput' } },
    {
      field: 'status', title: '状态', span: 8, itemRender: {
        name: 'select', options: [
          { label: '启用', value: 'enable' },
          { label: '禁用', value: 'disabled' },
        ]
      }
    },
    {
      span: 24,
      align: 'right',
      itemRender: {
        name: 'VxeButtonGroup',
        options: [
          { type: 'submit', content: '搜索', status: 'primary' },
          { type: 'reset', content: '重置' }
        ]
      }
    }
  ]
})

const handleEdit = (id: string) => {
  // todo:获取数据

  addDialog({
    title: "编辑角色",
    draggable: true,
    contentRenderer: () => DetailForm,
    props: {
      formInline: {
        name: 'zhangsan',
        identification: '1111111',
        status: 'enable',
        desc: 'test',
      }
    },
    beforeSure: (done, { dialogState }) => {

      // setTimeout(() => done(), 800);
    },
  })
}

const handleDel = (id: string) => {

}


const formEvents: VxeFormListeners = {
  submit() {
    console.log('form submit', formOptions.data)
  },
  reset() {
    console.log('form reset')
  }
}



const currentPage4 = ref(4)
const pageSize4 = ref(100)


const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}


</script>

<style lang='scss' scoped>
.toolbar {
  display: flex;
  justify-content: end;

  .el-button {
    margin: 5px;
  }
}
</style>
