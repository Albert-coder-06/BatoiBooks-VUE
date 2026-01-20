<script setup>
    import { store } from '../stores/store.js';

    const props = defineProps({
        book : Object,
    });

    const deleteBook = (bookId) => {
        store.removeBookAction(bookId);
    }

</script>


<template>

    <div class="card h-100 shadow-sm">
        <div class="card-body">
            <h5 class="card-title">Libro {{ props.book.id }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Módulo: {{ props.book.idModule }}</h6>

            <p class="card-text">
                <strong>Páginas:</strong> {{ props.book.pages }}<br>
                <strong>Estado:</strong> <span class="badge bg-info text-dark">{{ props.book.status }}</span><br>
                <strong>Venta:</strong> {{ props.book.soldDate && props.book.soldDate !== "" ? props.book.soldDate : "En venta" }}
            </p>
            <p class="small text-secondary">{{ props.book.comments }}</p>
            <h4 class="text-primary">{{ props.book.price }}€</h4>
            
            <div class="d-flex justify-content-between mt-3">
                <button class="btn btn-outline-primary btn-sm" name="add-to-cart">
                    <i class="bi bi-cart-plus"></i>
                </button>
                <button class="btn btn-outline-secondary btn-sm" name="edit">
                    <i class="bi bi-pencil"></i>
                </button>
                <slot></slot>
            </div>
        </div>
    </div>

</template>

<style scoped>
</style>