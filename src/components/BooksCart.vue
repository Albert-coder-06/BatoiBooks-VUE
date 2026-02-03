<script setup>
    import { useBatoiStore } from '../stores/batoiStore.js';
    import { onMounted, computed } from 'vue';

    const store = useBatoiStore();

    /*const cart = computed(() => store.cart);

    onMounted(() => {
        store.getCartAction();
    })

    const deleteBookFromCart = (bookId) => {
       store.deleteBookFromCartAction(bookId);
    }

    const clearCart = () => {
        store.clearCartAction();
    }*/

</script>


<template>
    <div>
        <h2>Carrito de la compra</h2>
        <p>No hay libros en el carrito</p>
        
        <!-- */
         
        <div v-for="book in cart" :key="book.id">
            {{ book.title }} - {{ book.price }}€

            <button class="btn btn-danger btn-sm" @click="deleteBookFromCart(book.id)">
                <i class="bi bi-trash"></i>
            </button>

        </div>

        <button class="btn btn-danger btn-sm" @click="clearCart()">Vaciar carrito</button> 
        
        * -->
        
    </div>
</template>