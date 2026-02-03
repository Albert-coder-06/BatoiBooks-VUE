<script setup>
    import { useBatoiStore } from '../stores/batoiStore.js';
    const store = useBatoiStore();

    const deleteMessage = (index) => {
        store.deleteMessageAction(index);
    }
</script>

<template>
    <div id="messages">
        <template v-if="store.messages.length">
            <aside v-for="(message, index) in store.messages" :key="index">
                <span>{{ message.message }}</span>
                <button type="button" @click="deleteMessage(index)">x</button>
            </aside>
        </template>
    </div>
</template>

<style scoped>
    aside {
        background-color: #d1ecf1;
        border: 1px solid #bee5eb;
        padding: 5px;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
    }
</style>