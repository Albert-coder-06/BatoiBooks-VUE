<script setup>
    import { computed } from 'vue';
    import { useBatoiStore } from '../stores/batoiStore.js';

    const store = useBatoiStore();

    const props = defineProps({
        book : Object,
    });

    const moduleName = computed(() => {
        const module = store.modules.find(m => m.code === props.book.idModule);
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

/* Book Card */
article {
    background-color: #ffc0cb;
    border: 1px solid #ffb6c1;
    padding: 10px;
    width: 250px;
}

article h5 {
    margin: 5px 0;
}

article footer {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* Icons/Buttons style from image */
article button {
    background-color: white;
    border: 1px solid #999;
    border-radius: 3px;
    padding: 2px 5px;
    margin-left: 2px;
    cursor: pointer;
}

article button i {
    color: black;
    font-size: 0.9rem;
}



</style>