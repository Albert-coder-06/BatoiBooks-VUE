//Controller.js
import Books from "../model/books.class.js";
import Book from "../model/book.class.js"
import Users from "../model/users.class.js"
import Modules from "../model/modules.class.js"
import View from "../view/View.class.js"
import Cart from "../model/Cart.class.js"

export default class Controller {
    constructor() {
        this.view = new View();
        this.model = {
            books: new Books(),
            modules: new Modules(),
            users: new Users(),
            cart: new Cart()
        }
    }

    async init() {
        

        this.view.setBookSubmitHandler(this.handleSubmitBook.bind(this), this.handleChangeBook.bind(this));
        this.view.setResetBtnHandler();
        this.view.setEmptyCartBtnHandler(this.handleEmptyCart.bind(this));
        this.view.setPurchaseCartBtnHandler(this.handleEmptyCart.bind(this));


        try {
            await Promise.all([
                this.model.modules.populate(),
                this.model.books.populate(),
                this.model.users.populate(),
                this.model.cart.populate()
            ]).then(() => {
                this.view.renderBooks(this.model.books.data, this.handleRemoveBook.bind(this), this.handleAddToCart.bind(this))
                this.view.renderModules(this.model.modules.data)
                this.view.renderCart(this.model.cart.data, this.handleRemoveBookCart.bind(this))
            })
        } catch (error) {
            this.view.showMessage("error",error.message)
        }
    }

    //---- Handles para libros ----
    async handleSubmitBook(book) {
        try {
            const newBook = await this.model.books.addBook(book);
            this.view.renderNewBook(newBook,this.handleRemoveBook.bind(this)); // ← ahora sí
            this.view.showMessage("info", "Libro añadido correctamente");
        } catch (error) {
            this.view.showMessage("error", error.message);
        }
    }


    async handleRemoveBook(idBook) {
        try {
            await this.model.books.removeBook(idBook); 
            this.view.renderBooks(this.model.books.data);
            this.view.showMessage("info", "Libro eliminado correctamente");
        } catch (error) {
            this.view.showMessage("error", error.message);
        }
    }   

    async handleChangeBook(book) {
        try {
            await this.model.books.changeBook(book); 
            this.view.renderBooks(this.model.books.data);
            this.view.showMessage("info", "Libro editado correctamente");
        } catch (error) {
            this.view.showMessage("error", error.message);
        }
    }   

    //---- Handles para carrito ----

    handleAddToCart(book) {
        let bookToClass = new Book(book);
        try{
            this.model.cart.addItem(bookToClass)
            this.view.renderNewBookCart(bookToClass, this.handleRemoveBookCart.bind(this))
            this.view.showMessage("info","El libro se ha añadido al carrito");
        }catch(error){
            this.view.showMessage("error",error.message)
        }
    }

    handleRemoveBookCart(book) {
        let idBook = book.id;
        try{
            this.model.cart.removeItem(idBook)
            this.view.showMessage("info","El libro se ha eliminado del carrito");
        }catch(error){
            this.view.showMessage("error",error.message)
        }
    }

    handleEmptyCart() {
        try{
            this.model.cart.empty()
            this.view.renderCart(this.model.cart.data, this.handleRemoveBookCart.bind(this))
            this.view.showMessage("info","El carrito se ha vaciado correctamente");
        }catch(error){
            this.view.showMessage("error",error.message)
        }
    }



}