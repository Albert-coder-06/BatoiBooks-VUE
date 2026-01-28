<script setup>
    import { computed } from 'vue';
    import { store } from '../stores/store.js';

    const props = defineProps({
        book : Object,
    });

    const moduleName = computed(() => {
        const module = store.state.modules.find(m => m.code === props.book.idModule);
        return module ? module.cliteral : props.book.idModule;
    });

</script>


<template>
    <article>
        <header>
            <span>Libro: {{ props.book.id }}</span>
            <h6>Modulo: {{ moduleName }} ({{ props.book.idModule }})</h6>
        </header>
        
        <div>
            <b>{{ props.book.publisher }}</b>
            <div>{{ props.book.pages }} páginas</div>
            <div>Estado: {{ props.book.status }}</div>
            <div>{{ props.book.soldDate && props.book.soldDate !== "" ? "Vendido el " + props.book.soldDate : "No vendido aún" }}</div>
            <div><i>{{ props.book.comments }}</i></div>
        </div>

        <footer>
            <h5>{{ props.book.price }} €</h5>
            <div>
                <button title="Añadir al carrito"><i class="bi bi-cart-plus"></i></button>
                <slot name="delete"></slot>
                <slot name="edit"></slot>
            </div>
        </footer>
    </article>
</template>

<style scoped>
</style>