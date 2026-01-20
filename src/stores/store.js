import { reactive } from "vue";
import * as api from "../services/api";

export const store = {
    debug: true,
    state: reactive({
        books: [],
        messages: [],
    }),
    async fetchBooksAction() {
        if (this.debug) console.log("fetchBooksAction triggered");

        this.state.books = await api.fetchBooks();
    },
    async addBookAction(newBook) {
        if (this.debug) console.log("addBookAction triggered with ", newBook);

        const addedBook = await api.addBook(newBook);

        this.state.books.push(addedBook);
    },
    async removeBookAction(bookIdToRemove) {
        if (this.debug) console.log("removeBookAction triggered with id ", bookIdToRemove);

        await api.removeBook(bookIdToRemove);

        this.state.books = this.state.books.filter((book) => book.id !== bookIdToRemove);
    },
    async toggleDoneAction(todoId, done) {
        if (this.debug) console.log("toggleDoneAction triggered with id ", todoId, " done: ", done);

        const updatedTodo = await api.toggleTodoDone(todoId, done);
        const index = this.state.todos.findIndex((todo) => todo.id === todoId);

        if (index !== -1) {
            this.state.todos[index] = updatedTodo;
        }
    },
    addMessageAction(message, type = 'info') {
        this.state.messages.push({ message, type });
    },
    deleteMessageAction(index) {
        this.state.messages.splice(index, 1);
    }
};
