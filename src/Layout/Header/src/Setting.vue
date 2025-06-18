<template>
    <el-drawer v-model="model" title="I am the title" :with-header="false">
        <span>Hi there!</span>
    </el-drawer>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

const model = defineModel()
//todo：
</script>

<style scoped></style>