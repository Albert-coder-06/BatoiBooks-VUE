<script setup>
    import { store } from '../stores/store.js';
    import { computed, ref, onMounted } from 'vue';

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

    onMounted(() => {
        store.loadModulesAction();  
    });

</script>

<template>
    <div>
        <b>Añadir libro:</b>
        <br><br>
        <form @submit.prevent="addBook">
            Id: <input type="text" disabled><br>
            Módulo:
            <select v-model="newBook.idModule">
                <option v-for="module in modules" :key="module.id" :value="module.code">
                    {{ module.cliteral }}
                </option>
            </select><br>
            Editorial: <input type="text" v-model="newBook.publisher"><br>
            Precio: <input type="number" step="0.01" v-model="newBook.price"><br>
            Páginas: <input type="number" step="1" v-model="newBook.pages"><br>
            Estado:<br>
            <input type="radio" v-model="newBook.status" value="new">Nuevo<br>
            <input type="radio" v-model="newBook.status" value="good">Bueno<br>
            <input type="radio" v-model="newBook.status" value="bad">Malo<br>
            <input type="radio" v-model="newBook.status" value="digital">Digital<br>
            <br>
            Comentarios: <textarea v-model="newBook.comments"></textarea><br>
            <button type="submit">Guardar</button> <button type="reset">Reset</button>
        </form>
        <br>
        
    </div>
</template>

<style scoped>
</style>