<script setup>
    const props = defineProps({
        messages: Array,
    });

    const deleteMessage = (message) => {
        
    }

</script>

<template>
    <div class="messages" id="messages">
        <div v-bind:class="message.type" v-for="(message,index) in props.messages" :key="index" v-if="props.messages.length">
            
            <p>{{ message }}</p>

            <button @click="deleteMessage(message)">X</button>
        </div>

        <p v-else >No hay ningun mensaje</p>
    </div>
</template>

<style scoped>
    #messages {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto;
    }


</style>