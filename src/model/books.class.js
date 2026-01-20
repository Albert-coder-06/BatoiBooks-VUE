//Books.js
import Book from './book.class.js';
import * as api from '../services/api.js'
export default class Books {

    constructor() {
        this.data = [];
    }

    async populate() {


        let books = await api.getDBBooks();

        if (books !== false) {
            books.forEach(book => this.data.push(new Book(book)))
        } else {
            throw new Error("Error en la poblacion");
        }

    }

    async addBook(book) {
        let libroNuevo = new Book(book);

        if(book.id === undefined && this.data.length === 0) {
            libroNuevo.id = 1;
        } else {
            let maxId = this.data.reduce((max, libro) => Math.max(max, Number(libro.id)), 0);
            libroNuevo.id = maxId + 1;
            book.id = maxId + 1;
        }

        let libroNuevoIdString = new Book(book);
        libroNuevoIdString.id = `${libroNuevo.id}`;

        let responseBook = await api.addDBBook(libroNuevoIdString);

        if (responseBook !== false) {
            this.data.push(libroNuevo);
        } else {
            throw new Error("No se ha podido añadir el libro")
        }

        
        return libroNuevo;
    }

    async removeBook(id) {

        let busquedaPosicion = this.data.findIndex(book => book.id === id);

        if (busquedaPosicion === -1) {
            throw new Error("No se ha encontrado el libro");
        }

        const response = await api.removeDBBook(id);

        if (response === false) {
            throw new Error("Error en la eliminación del libro");
        }

        // Si es ok, elimina del array
        this.data.splice(busquedaPosicion, 1);
    }


    async changeBook(book) {
        let idBook = book.id;


        let busquedaPosicion = this.data.findIndex(book => book.id === idBook);

        if (busquedaPosicion !== -1) {

            let response = await api.changeDBBook(book);

            if (response !== false) {

                if (book instanceof Book) {
                    this.data.splice(busquedaPosicion, 1, book);
                    return book;
                } else {
                    let libroCambiado = new Book(book);
                    this.data.splice(busquedaPosicion, 1, libroCambiado);
                    return libroCambiado;
                }
                
            } else {
                throw new Error("Error en la actualizacion del libro")
            }

            
        } else {
            throw new Error("No se ha encontrado el libro");
        }
    }

    toString() {
        let salida = "";

        this.data.forEach(book => salida += book.toString() + "\n\n");

        return salida;
    }

    getBookById(bookId) {
        let busqueda = this.data.find(libro => libro.id === bookId);
        if (busqueda === undefined) {
            throw new Error();
        } else {
            return busqueda;
        }
    }

    getBookIndexById(bookId) {
        let busqueda = this.data.findIndex(libro => libro.id === bookId);

        if (busqueda === -1) {
            throw new Error();
        } else {
            return busqueda;
        }
    }

    bookExists(userId, moduleCode) {
        return this.data.some(libro => libro.userId === userId && libro.moduleCode === moduleCode);
    }

    booksFromUser(userId) {
        return this.data.filter(libro => libro.userId === userId);
    }

    booksFromModule(moduleCode) {
        return this.data.filter(libro => libro.moduleCode === moduleCode);
    }

    booksCheeperThan(price) {
        return this.data.filter(libro => libro.price <= price);
    }

    booksWithStatus(status) {
        return this.data.filter(libro => libro.status === status);
    }

    booksOfTypeNotes() {
        return this.data.filter(libro => libro.publisher === "Apunts");
    }

    averagePriceOfBooks() {
        if(this.data.length == 0) {
            return "0.00 €"
        } else {
            return (this.data.reduce((total, libro) => total+=libro.price,0) / this.data.length).toFixed(2) + " €";
        }
        
    }

    booksNotSold() {
        return this.data.filter(libro => libro.soldDate === "");
    }






}