<template>
    <div>
        <Header></Header>
        <div class="bottom">
            <Left></Left>
            <Center></Center>
            <Right></Right>
        </div>
    </div>
</template>

<script setup lang="ts">
import Header from './components/header.vue'
import Left from './components/left.vue'
import Center from './components/center.vue'
import Right from './components/right.vue'
</script>

<style scoped>
.bottom {
    display: flex;
    justify-content: space-between;
    padding: 20px 20px;
    border: 1px solid red;
    height: calc(100vh - 100px)
}
</style>