<script setup>
    import { onMounted, computed } from 'vue';
    import { useBatoiStore } from '../stores/batoiStore.js';
    import BookItem from './BookItem.vue';
    
    const store = useBatoiStore();
    const books = computed(() => store.books);

    const totalBooks = computed(() => books.value.length);
    
    const totalPrice = computed(() => {
        return books.value.reduce((total, book) => total + parseFloat(book.price), 0).toFixed(2);
    });

    const deleteBook = (id) => {
        if (confirm('¿Estás seguro de que quieres eliminar este libro?')) {
            store.removeBookAction(id);
        }
    };

    onMounted(() => {
        store.fetchBooksAction();
        store.loadModulesAction();
    });

</script>

<template>
    <div>
        <section id="list" v-if="books.length">
            <div v-for="book in books" :key="book.id">
                <BookItem :book="book">
                    <button @click="deleteBook(book.id)" title="Eliminar"><i class="bi bi-trash"></i></button>
                </BookItem>
            </div>
        </section>

        <div v-else>
            No hay libros en la BBDD
        </div>

        <section id="summary" v-if="books.length">
            <p>Total de libros: {{ totalBooks }}</p>
            <p>Importe total: {{ totalPrice }} €</p>
        </section>
    </div>
</template>

<style scoped>
</style>
