<script setup>
    import { onMounted, computed } from 'vue';
    import { useBatoiStore } from '../stores/batoiStore.js';
    import BookItem from '../components/BookItem.vue';
    import { useRouter } from 'vue-router';
    
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

    const router = useRouter();

    const editBook = (id) => {
        router.push({ name: 'edit-book', params: { id } });
    };

</script>

<template>
    <div>
        <section id="list" v-if="books.length">
            <div v-for="book in books" :key="book.id">
                <BookItem :book="book">
                    <template #delete>
                        <button @click="deleteBook(book.id)" title="Eliminar"><i class="bi bi-trash"></i></button>
                    </template>
                    <template #edit>
                        <button @click="editBook(book.id)" title="Editar"><i class="bi bi-pencil"></i></button>
                    </template>
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

    section#list {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 20px;
    }

    section#summary {
        border-top: 1px solid #ccc;
        padding-top: 10px;
        margin-bottom: 20px;
    }
</style>
