<script setup>
    import { store } from '../stores/store.js';

    const deleteMessage = (index) => {
        store.deleteMessageAction(index);
    }
</script>

<template>
    <div class="messages" id="messages">
        <template v-if="store.state.messages.length">
            <div :class="message.type" v-for="(message, index) in store.state.messages" :key="index">
                <p>{{ message.message }}</p>
                <button @click="deleteMessage(index)">X</button>
            </div>
        </template>
        <p v-else>No hay ningún mensaje</p>
    </div>
</template>

<style scoped>
    #messages {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto;
        border: 1px solid rgb(255, 0, 0);
    }


</style>