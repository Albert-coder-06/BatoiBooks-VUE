<script setup>
    import { store } from '../stores/store.js';

    const props = defineProps({
        book : Object,
    });

    const deleteBook = (bookId) => {
        store.deleteMessageAction(bookId);
    }

</script>


<template>

    <div class="card">
        <h3>Libro {{ props.book.id }}</h3>
        <h4>{{ props.book.moduleCode }}({{ props.book.id }})</h4>

        <p>Paginas: {{ props.book.pages }}</p>
        <p>Estado: {{ props.book.status }}</p>
        <p>${book.soldDate && book.soldDate !== "" ? book.soldDate : "En venta"}</p>
        <p>${book.comments}</p>
        <h4>${book.price}€</h4>

        <button name="add-to-cart">
            <span>add_shopping_cart</span>
        </button>
        <button name="edit">
            <span>edit</span>
        </button>
        <button name="delete">
            <span>delete</span>
        </button>
    </div>

</template>

<style scoped>
    .card {
    width: 50%;
    padding: 20px;
    justify-self: center;
    text-align: center;
    background-color: bisque;
    border-radius: 20px;
}
</style>