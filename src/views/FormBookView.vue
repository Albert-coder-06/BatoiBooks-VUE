<script setup>
    import { useRoute, useRouter } from 'vue-router';
    import { useBatoiStore } from '../stores/batoiStore.js';
    import { computed, ref, onMounted, watch } from 'vue';
    import { Form as VForm, Field, ErrorMessage } from 'vee-validate';
    import * as yup from 'yup';

    const route = useRoute();
    const router = useRouter();
    const store = useBatoiStore();

    const formMode = computed(() => route.name === "edit-book" ? "edit" : "add");
    const modules = computed(() => store.modules);
    
    const isLoaded = ref(false);
    const initialValues = ref({
        idModule: '0',
        publisher: '',
        price: 0,
        pages: 0,
        status: '',
        comments: ''
    });

    // Validation Schema
    const schema = yup.object({
        idModule: yup.string().required('El módulo es obligatorio').notOneOf(['0'], 'Debe seleccionar un módulo'),
        publisher: yup.string().required('La editorial es obligatoria'),
        price: yup.number()
            .typeError('El precio debe ser un número')
            .required('El precio es obligatorio')
            .min(0, 'El precio debe ser mayor o igual que 0'),
        pages: yup.number()
            .typeError('Las páginas deben ser un número')
            .required('Las páginas son obligatorias')
            .integer('Las páginas deben ser un número entero')
            .min(0, 'Las páginas deben ser mayor o igual que 0'),
        status: yup.string().required('El estado es obligatorio'),
    });

    const saveBook = async (values) => {

        if (formMode.value === 'add') {
            const isDuplicate = store.books.some(book => 
                (book.idModule === values.idModule || book.moduleCode === values.idModule) && 
                book.publisher === values.publisher &&
                book.userId === 1
            );

            if (isDuplicate) {
                store.addMessageAction("Este libro ya ha sido dado de alta por ti.", 'error');
                return;
            }
        }

        const bookData = {
            ...values,
            userId: 1
        };

        if (formMode.value === "edit") {
            bookData.id = route.params.id;
            const success = await store.updateBookAction(bookData);
            if (success) router.push("/");
        } else {
            const success = await store.addBookAction(bookData);
            if (success) router.push("/");
        }
    };

    const resetForm = async () => {
        isLoaded.value = false;
        if (formMode.value === "edit") {
            const bookData = await store.getBookAction(route.params.id);
            if (bookData) {
                initialValues.value = {
                    idModule: bookData.idModule || bookData.moduleCode,
                    publisher: bookData.publisher,
                    price: bookData.price,
                    pages: bookData.pages,
                    status: bookData.status,
                    comments: bookData.comments
                };
            }
        } else {
            initialValues.value = {
                idModule: '0',
                publisher: '',
                price: 0,
                pages: 0,
                status: '',
                comments: ''
            };
        }
        isLoaded.value = true;
    };

    watch(formMode, (newVal) => {
        resetForm();
    });

    onMounted(async () => {
        await store.loadModulesAction();
        await store.fetchBooksAction();
        await resetForm();
    });

</script>

<template>
    <div class="container mt-4">
        <h3>{{ formMode === 'edit' ? 'Editar' : 'Añadir' }} libro</h3>
        <hr>
        <VForm v-if="isLoaded" @submit="saveBook" :validation-schema="schema" :initial-values="initialValues" v-slot="{ errors }">
            <div class="mb-3" v-if="formMode === 'edit'">
                <label class="form-label">Id:</label>
                <input type="text" class="form-control" :value="route.params.id" disabled>
            </div>

            <div class="mb-3">
                <label class="form-label">Módulo:</label>
                <Field name="idModule" as="select" class="form-select" :class="{'is-invalid': errors.idModule}">
                    <option value="0" disabled>Selecciona un módulo...</option>
                    <option v-for="module in modules" :key="module.id" :value="module.code">
                        {{ module.cliteral }}
                    </option>
                </Field>
                <ErrorMessage name="idModule" class="invalid-feedback" />
            </div>

            <div class="mb-3">
                <label class="form-label">Editorial:</label>
                <Field name="publisher" type="text" class="form-control" :class="{'is-invalid': errors.publisher}" />
                <ErrorMessage name="publisher" class="invalid-feedback" />
            </div>

            <div class="mb-3">
                <label class="form-label">Precio:</label>
                <Field name="price" type="number" step="0.01" class="form-control" :class="{'is-invalid': errors.price}" />
                <ErrorMessage name="price" class="invalid-feedback" />
            </div>

            <div class="mb-3">
                <label class="form-label">Páginas:</label>
                <Field name="pages" type="number" step="1" class="form-control" :class="{'is-invalid': errors.pages}" />
                <ErrorMessage name="pages" class="invalid-feedback" />
            </div>
            
            <div class="mb-3">
                <label class="form-label">Estado:</label><br>
                <div class="form-check form-check-inline">
                    <Field name="status" type="radio" value="new" class="form-check-input" id="statusNew" />
                    <label class="form-check-label" for="statusNew">Nuevo</label>
                </div>
                <div class="form-check form-check-inline">
                    <Field name="status" type="radio" value="good" class="form-check-input" id="statusGood" />
                    <label class="form-check-label" for="statusGood">Bueno</label>
                </div>
                <div class="form-check form-check-inline">
                    <Field name="status" type="radio" value="bad" class="form-check-input" id="statusBad" />
                    <label class="form-check-label" for="statusBad">Malo</label>
                </div>
                <div class="form-check form-check-inline">
                    <Field name="status" type="radio" value="digital" class="form-check-input" id="statusDigital" />
                    <label class="form-check-label" for="statusDigital">Digital</label>
                </div>
                <ErrorMessage name="status" class="text-danger d-block small" />
            </div>
            
            <div class="mb-3">
                <label class="form-label">Comentarios:</label>
                <Field name="comments" as="textarea" class="form-control" rows="3" />
            </div>
            
            <div class="mt-4">
                <button type="submit" class="btn btn-primary me-2">
                    <i class="bi bi-save"></i> Guardar
                </button> 
                <button type="button" @click="resetForm" class="btn btn-secondary">
                    <i class="bi bi-arrow-counterclockwise"></i> Reset
                </button>
            </div>
        </VForm>
        <div v-else class="text-center mt-5">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Cargando...</span>
            </div>
            <p>Cargando datos del libro...</p>
        </div>
    </div>
</template>

<style scoped>
</style>
