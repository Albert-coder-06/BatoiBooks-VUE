import { defineStore } from 'pinia';
import { ref } from 'vue';
import * as api from '../services/api';

export const useBatoiStore = defineStore('batoi', () => {
    const books = ref([]);
    const messages = ref([]);
    const cart = ref([]);
    const modules = ref([]);
    const debug = ref(true);

    // Books actions
    async function fetchBooksAction() {
        if (debug.value) console.log("fetchBooksAction triggered");
        const response = await api.fetchBooks();
        if (debug.value) console.log("API Response:", response);

        if (response.success) {
            books.value = response.data;
            addMessageAction("Libros cargados correctamente", 'success');
        } else {
            addMessageAction(response.message, 'error');
        }
    }

    async function addBookAction(newBook) {
        if (debug.value) console.log("addBookAction triggered with ", newBook);


        if (books.value.length > 0) {
            let lastId = books.value[books.value.length - 1].id;
            newBook.id = String(parseInt(lastId) + 1);
        } else {
            newBook.id = "1";
        }

        const response = await api.addBook(newBook);

        if (response.success) {
            books.value.push(response.data);
            addMessageAction("Libro añadido correctamente", 'success');
            return true;
        } else {
            addMessageAction(response.message, 'error');
            return false;
        }
    }

    async function removeBookAction(bookIdToRemove) {
        if (debug.value) console.log("removeBookAction triggered with id ", bookIdToRemove);
        const response = await api.removeBook(bookIdToRemove);
        if (response.success) {
            books.value = books.value.filter((book) => book.id !== bookIdToRemove);
            addMessageAction(response.message, 'success');
        } else {
            addMessageAction(response.message, 'error');
        }
    }

    async function getBookAction(bookId) {
        if (debug.value) console.log("getBookAction triggered with id ", bookId);
        const response = await api.getBook(bookId);
        if (response.success) {
            addMessageAction("Libro cargado correctamente", 'success');
            return response.data;
        } else {
            addMessageAction(response.message, 'error');
            return false;
        }
    }

    async function updateBookAction(book) {
        if (debug.value) console.log("updateBookAction triggered with book ", book);
        const response = await api.updateBook(book);
        if (response.success) {
            addMessageAction("Libro editado correctamente", 'success');
            // Update the book in the list if it exists
            const index = books.value.findIndex(b => b.id === book.id);
            if (index !== -1) {
                books.value[index] = response.data;
            }
            return response.data;
        } else {
            addMessageAction(response.message, 'error');
            return false;
        }
    }



    // Cart actions
    function getCartAction() {
        if (debug.value) console.log("getCartAction triggered");
        const storedCart = localStorage.getItem("cart");
        if (storedCart === null) {
            cart.value = [];
        } else {
            cart.value = JSON.parse(storedCart);
        }
    }

    function addBookToCartAction(book) {
        cart.value.push(book);
        localStorage.setItem("cart", JSON.stringify(cart.value));
    }

    function deleteBookFromCartAction(index) {
        cart.value.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart.value));
    }

    function clearCartAction() {
        cart.value = [];
        localStorage.setItem("cart", JSON.stringify(cart.value));
    }

    // Modules actions
    async function loadModulesAction() {

        if (modules.value.length > 0) {
            if (debug.value) console.log("loadModulesAction: Modules already loaded, skipping fetch");
            return;
        }

        if (debug.value) console.log("loadModulesAction triggered");
        
        const response = await api.loadModules();

        if (response.success) {
            modules.value = response.data;
            addMessageAction("Módulos cargados correctamente", 'success');
        } else {
            addMessageAction(response.message, 'error');
        }
    }

    // Messages actions
    function addMessageAction(message, type = 'info') {
        messages.value.push({ message, type });
    }

    function deleteMessageAction(index) {
        messages.value.splice(index, 1);
    }

    return {
        books,
        messages,
        cart,
        modules,
        debug,
        fetchBooksAction,
        addBookAction,
        removeBookAction,
        getBookAction,
        updateBookAction,
        getCartAction,
        addBookToCartAction,
        deleteBookFromCartAction,
        clearCartAction,
        loadModulesAction,
        addMessageAction,
        deleteMessageAction
    };
});
