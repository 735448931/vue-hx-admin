<template>
    <el-table :data="props.data" v-bind="$attrs">
        <template v-for="item in config" :key="item.prop">
            <el-table-column :prop="item.prop" :label="item.label" v-bind="item.attrs">
                <!-- 动态处理插槽 -->
                <template v-for="slotType in getSlotTypes(item.prop)" #[slotType]="scope">
                    <slot :name="`${item.prop}_${slotType}`" v-bind="scope"></slot>
                </template>

                <template v-if="item.prop === 'action' && getSlotTypes(item.prop).length === 0">
                    <el-button @click="handleEdit">编辑</el-button>
                    <el-button @click="handleDelete">删除</el-button>
                </template>
            </el-table-column>
        </template>
    </el-table>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
const slots = useSlots()

const slotMap = computed(() => {
    const map: Record<string, string[]> = {};
    Object.keys(slots).forEach(item => {
        const [prop, type] = item.split('_');
        if (prop && type) {
            if (!map[prop]) {
                map[prop] = [];
            }
            map[prop].push(type);
        }
    });

    return map;
});

// 获取某个prop对应的所有插槽类型
const getSlotTypes = (prop: string) => {
    return slotMap.value[prop] || [];
};

interface DTableProps {
    data: any
    config: any
}

const props = defineProps<DTableProps>()

const handleEdit = () => {

}

const handleDelete = () => {

}
</script>

<style scoped></style>