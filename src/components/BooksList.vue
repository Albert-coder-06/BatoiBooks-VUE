<script setup>
    import { onMounted, computed } from 'vue';
    import { store } from '../stores/store.js';
    import BookItem from './BookItem.vue';
    
    const books = computed(() => store.state.books);

    const deleteBook = (id) => {
        if (confirm('¿Estás seguro de que quieres eliminar este libro?')) {
            store.removeBookAction(id);
        }
    };

    onMounted(() => {
        store.fetchBooksAction();
    });

</script>

<template>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-2" v-if="books.length">
        <div v-for="book in books" :key="book.id" class="col">
            <BookItem :book="book">
                <button name="delete" class="btn btn-danger btn-sm" @click="deleteBook(book.id)">
                    <i class="bi bi-trash"></i>
                </button>
            </BookItem>
        </div>
    </div>

    <div v-else class="alert alert-info text-center mt-4">
        No hay libros en la BBDD
    </div>
</template>

<style scoped>
</style>

