<script setup>
    import { store } from '../stores/store.js';

    const deleteMessage = (index) => {
        store.deleteMessageAction(index);
    }
</script>

<template>
    <div id="messages">
        <template v-if="store.state.messages.length">
            <aside v-for="(message, index) in store.state.messages" :key="index">
                <span>{{ message.message }}</span>
                <button type="button" @click="deleteMessage(index)">x</button>
            </aside>
        </template>
    </div>
</template>

<style scoped>
</style>