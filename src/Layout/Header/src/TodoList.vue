<template>
    <div class="todo">
        <div class="todo-row">
            <div class="title">{{ props.message.title }}</div>
            <div class="tag">
                <el-tag type="primary">{{ props.message.tag }}</el-tag>
            </div>
        </div>
        <div class="message">{{ props.message.message }}</div>
    </div>
</template>

<script setup lang="ts">
interface Todo {
    _id: string,
    title: string
    message: string
    tag: string
}

interface TodoProps {
    message: Todo
}
const props = defineProps<TodoProps>()
</script>

<style scoped lang="scss">
.todo {
    padding: 10px 20px;
    border-bottom: 1px solid #f6f6f6;

    .todo-row {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .title {
            font-size: 14px;
        }

    }

    .message {
        margin-top: 10px;
    }
}
</style>