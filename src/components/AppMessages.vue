<script setup>
    import { store } from '../stores/store.js';

    const deleteMessage = (index) => {
        store.deleteMessageAction(index);
    }

    const getAlertClass = (type) => {
        const types = {
            'info': 'alert-info',
            'success': 'alert-success',
            'error': 'alert-danger',
            'warning': 'alert-warning'
        };
        return types[type] || 'alert-info';
    }
</script>

<template>
    <div class="messages mt-3" id="messages">
        <template v-if="store.state.messages.length">
            <div :class="['alert', getAlertClass(message.type), 'alert-dismissible', 'fade', 'show']" 
                 v-for="(message, index) in store.state.messages" :key="index" role="alert">
                {{ message.message }}
                <button type="button" class="btn-close" @click="deleteMessage(index)" aria-label="Close"></button>
            </div>
        </template>
    </div>
</template>

<style scoped>
</style>