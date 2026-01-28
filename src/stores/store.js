import { reactive } from "vue";
import * as api from "../services/api";

export const store = {

    debug: true,
    state: reactive({
        books: [],
        messages: [],
        cart: [],
        modules: [],
    }),


    async fetchBooksAction() {
        if (this.debug) console.log("fetchBooksAction triggered");

        const response = await api.fetchBooks();
        if (this.debug) console.log("API Response:", response);

        if (response.success) {
            // Vaciamos y rellenamos para asegurar reactividad en todos los casos
            this.state.books.splice(0, this.state.books.length, ...response.data);

            this.addMessageAction("Libros cargados correctamente", 'success');

            if (this.debug) console.log("Books loaded:", this.state.books);

        } else {
            this.addMessageAction(response.message, 'error');  
        }
    },
    async addBookAction(newBook) {
        if (this.debug) console.log("addBookAction triggered with ", newBook);

        let lastId = this.state.books[this.state.books.length - 1].id;
        newBook.id = String(parseInt(lastId) + 1);

        const response = await api.addBook(newBook);

        if (response.success) {
            this.state.books.push(response.data);
            this.addMessageAction("Libro añadido correctamente", 'success');
        } else {
            this.addMessageAction(response.message, 'error');
        }
    },
    async removeBookAction(bookIdToRemove) {
        if (this.debug) console.log("removeBookAction triggered with id ", bookIdToRemove);

        const response = await api.removeBook(bookIdToRemove);

        if (response.success) {
            this.state.books = this.state.books.filter((book) => book.id !== bookIdToRemove);
            this.addMessageAction(response.message, 'success');
        } else {
            this.addMessageAction(response.message, 'error');
        }
    },
    async getBookAction(bookId) {
        if (this.debug) console.log("getBookAction triggered with id ", bookId);

        const response = await api.getBook(bookId);

        if (response.success) {
            this.addMessageAction("Libro cargado correctamente", 'success');
            return response.data;
        } else {
            this.addMessageAction(response.message, 'error');
            return false;
        }
    },
    async updateBookAction(book) {
        if (this.debug) console.log("updateBookAction triggered with book ", book);

        const response = await api.updateBook(book);

        if (response.success) {
            this.addMessageAction("Libro editado correctamente", 'success');
            return response.data;
        } else {
            this.addMessageAction(response.message, 'error');
            return false;
        }


    },

    
    getCartAction() {
        if (this.debug) console.log("getCartAction triggered");

        if (localStorage.getItem("cart") === null) {
            this.state.cart = [];
        } else {
            this.state.cart = JSON.parse(localStorage.getItem("cart"));
        }
    },
    addBookToCartAction(book) {
        this.state.cart.push(book);
        localStorage.setItem("cart", JSON.stringify(this.state.cart));
    },
    deleteBookFromCartAction(bookId) {
        this.state.cart.splice(bookId, 1);
        localStorage.setItem("cart", JSON.stringify(this.state.cart));
    },
    clearCartAction() {
        this.state.cart.splice(0, this.state.cart.length);
        localStorage.setItem("cart", JSON.stringify(this.state.cart));
    },

    async loadModulesAction() {
        if (this.debug) console.log("loadModulesAction triggered");

        const response = await api.loadModules();

        if (response.success) {
            this.state.modules = response.data;
            this.addMessageAction("Módulos cargados correctamente", 'success');
        } else {
            this.addMessageAction(response.message, 'error');
        }
    },

    addMessageAction(message, type = 'info') {
        this.state.messages.push({ message, type });
    },
    deleteMessageAction(index) {
        this.state.messages.splice(index, 1);
    }
};
