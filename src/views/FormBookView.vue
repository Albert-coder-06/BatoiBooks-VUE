<script setup>
    import { useRoute, useRouter } from 'vue-router';
    import { store } from '../stores/store.js';
    import { computed, ref, onMounted } from 'vue';

    const route = useRoute();
    const router = useRouter();

    // 1. Detectamos el modo dinámicamente. ¡No necesitas props para esto, hermano!
    const formMode = computed(() => (route.name === "edit-book") ? "edit" : "add");

    // 2. Estado local del formulario
    const newBook = ref({
        idModule: 0,
        publisher: "",
        price: 0,
        pages: 0,
        status: "",
        comments: "",
        soldDate: ""
    });

    const modules = computed(() => store.state.modules);

    // 3. Lógica para guardar (POST o PUT)
    const saveBook = () => {
        if (formMode.value === "edit") {
            store.updateBookAction(newBook.value);
        } else {
            store.addBookAction(newBook.value);
            router.push("/")
        }
    };

    // 4. Resetear el formulario (Usando Spread Operator, tt)
    const resetForm = async () => {
        if (formMode.value === "edit") {
            const originalBook = await store.getBookAction(route.params.id);
            // Copiamos todas las propiedades de golpe
            newBook.value = { ...originalBook };
        } else {
            // Limpiar para modo "add"
            newBook.value = { idModule: 0, publisher: "", price: 0, pages: 0, status: "", comments: "", soldDate: "" };
        }
    };

    onMounted(async () => {
        store.loadModulesAction();

        // Si estamos editando, cargamos los datos del libro al entrar
        if (formMode.value === 'edit') {
            const bookData = await store.getBookAction(route.params.id);
            if (bookData) {
                // Rellenamos el formulario con lo que viene del store
                newBook.value = { ...bookData };
            }
        }
    });
</script>

<template>
    <div>
        <b>{{ formMode === 'edit' ? 'Editar' : 'Añadir' }} libro:</b>
        <br><br>
        <form @submit.prevent="saveBook">
            <template v-if="formMode === 'edit'">
                Id: <input type="text" :value="route.params.id" disabled><br>
            </template>

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
            
            <button type="submit">Guardar</button> 
            <button type="button" @click="resetForm">Reset</button>
        </form>
    </div>
</template>