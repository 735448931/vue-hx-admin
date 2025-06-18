<template>
    <div class="message">
        <div class="message-left">
            <el-avatar>{{ props.message.name }}</el-avatar>
        </div>
        <div class="message-right">
            <div class="message-name">{{ props.message.name }} 评论了你</div>
            <div class="message-content">{{ props.message.message }}</div>
            <div class="message-time">{{ props.message.time }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">

interface Message {
    _id: string,
    name: string
    message: string
    time: string
}

interface MessageProps {
    message: Message
}
const props = defineProps<MessageProps>()

</script>

<style scoped lang="scss">
.message {
    display: flex;
    border-bottom: 1px solid #f6f6f6;
    align-items: center;

    .message-left {
        margin: 0 10px;
    }

    .message-right {
        flex: 1;
        margin-left: 10px;

        .message-name {
            margin-top: 10px;
        }

        .message-content {
            margin: 6px 0 4px;
        }

        .message-time {
            margin-bottom: 5px;
            color: #8c8c8c;
        }
    }
}
</style>
