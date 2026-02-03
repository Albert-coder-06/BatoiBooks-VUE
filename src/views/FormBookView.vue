<script setup>
    import { useRoute, useRouter } from 'vue-router';
    import { useBatoiStore } from '../stores/batoiStore.js';
    import { computed, ref, onMounted, watch } from 'vue';

    const route = useRoute();
    const router = useRouter();
    const store = useBatoiStore();

    const formMode = computed(() => route.name === "edit-book" ? "edit" : "add");

    const modules = computed(() => store.modules);

    const newBook = ref({
        idModule: 0,
        publisher: "",
        price: 0,
        pages: 0,
        status: "",
        comments: "",
        soldDate: ""
    });

    const saveBook = () => {
        if (formMode.value === "edit") {
            store.updateBookAction(newBook.value);
        } else {
            store.addBookAction(newBook.value);
            router.push("/")
        }
    };

    const resetForm = async () => {
        if (formMode.value === "edit") {
            const originalBook = await store.getBookAction(route.params.id);

            newBook.value = { ...originalBook };
        } else {
            newBook.value = { idModule: 0, publisher: "", price: 0, pages: 0, status: "", comments: "", soldDate: "" };
        }
    };

    watch(formMode, (newVal) => {
        if (newVal === "add") {
            resetForm();
        }
    });

    onMounted(async () => {
        store.loadModulesAction();

        if (formMode.value === 'edit') {

            const bookData = await store.getBookAction(route.params.id);

            if (bookData) {
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

<style scoped>
    form {
        margin-top: 10px;
    }
</style>