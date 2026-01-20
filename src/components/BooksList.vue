<script setup>
    import { onMounted } from 'vue';
    import { store } from '../stores/store.js';
    
    const books = computed(() => store.state.books);

    


</script>

<template>

    <div id="list" v-if="books.length">
        <BookItem v-for="(value, index) in books :key="index" :book="">
            
        </BookItem>
    </div>

    <p v-else>No hay libros en la BBDD</p>

</template>


<style scoped>

#list {
    margin-top: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto;
    row-gap: 15px;
    justify-self: center;
    width: 100%;
}



</style>

