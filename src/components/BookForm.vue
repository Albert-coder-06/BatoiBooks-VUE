<script setup>
    import { store } from '../stores/store.js';
    import { computed, ref } from 'vue';

    const newBook = ref({
      idModule: 0,
      publisher: "",
      price: 0,
      pages: 0,
      status: "",
      comments: "",
      soldDate: ""
    });
    
    const addBook = () => {
        store.addBookAction(newBook.value);
    }

    const modules = computed(() => store.state.modules);
</script>

<template>
    <div class="my-5">
        <h2>Añadir libro</h2>

        <form @submit.prevent="addBook" class="d-flex flex-column gap-2">

            <label for="modulo">Módulo: </label>
            <select name="modulo" id="modulo" v-model="newBook.idModule">
                <option v-for="module in modules" :key="module.id" :value="module.id">
                    {{ module.cliteral }}
                </option>
            </select>

            <label for="editorial">Editorial: </label>
            <input type="text" name="editorial" id="editorial" v-model="newBook.publisher" placeholder="Editorial">

            <label for="precio">Precio: </label>
            <input type="number" step="0.01" name="precio" id="precio" v-model="newBook.price" placeholder="Precio">

            <label for="paginas">Paginas: </label>
            <input type="number" step="1" name="paginas" id="paginas" v-model="newBook.pages" placeholder="Paginas">
            
            <label for="estado">Estado: </label>
            <div class="d-flex flex-column align-items-start gap-2">
                <label>Nuevo<input type="radio" name="estado" v-model="newBook.status" value="Nuevo"></label>
                <label>Bueno<input type="radio" name="estado" v-model="newBook.status" value="Bueno"></label>
                <label>Malo<input type="radio" name="estado" v-model="newBook.status" value="Malo"></label>
                <label>Digital<input type="radio" name="estado" v-model="newBook.status" value="Digital"></label>
            </div>
            

            <label for="fecha">Fecha de venta: </label>
            <input type="date" name="fecha" id="fecha" v-model="newBook.soldDate" placeholder="Fecha de venta">

            <label for="comentarios">Comentarios: </label>
            <textarea name="comentarios" id="comentarios" v-model="newBook.comments" placeholder="Comentarios"></textarea>

            <div class="d-flex justify-content-center gap-2">
                <input class="w-25" type="submit" value="Añadir">
                <input class="w-25" type="reset" value="Reset">
            </div>

        </form>

    </div>
</template>

<style scoped></style>