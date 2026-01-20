import Book from './book.class.js';

export default class Cart {

    constructor(){
        this.data = [];
    }

    populate() {
        if (localStorage.getItem("carrito") === null) {
            localStorage.setItem("carrito", JSON.stringify([]));
        } else {
            let carritoStorage = JSON.parse(localStorage.getItem("carrito"));
            carritoStorage.forEach(libro => {
                this.data.push(new Book(libro))
            })
            console.log(this.data)

        }
    }

    getBookById(idBook) {
        let book = this.data.find(book => book.id === idBook);

        return book ?? {};
    }

    addItem(libro) {
        if(libro instanceof Book) {
            let busquedaLibro = this.getBookById(libro.id);

            if (busquedaLibro.id === undefined) {
                let copiaLibro = libro.clone();
                
                //Actualizacion localStorage
                let carritoStorage = JSON.parse(localStorage.getItem("carrito"))
                carritoStorage.push(copiaLibro)
                localStorage.setItem("carrito", JSON.stringify(carritoStorage))

                //Actualizacion this.data
                this.data.push(copiaLibro);
                
                return true;
            } else {
                throw new Error("El libro ya esta en el carrito");
            }
        } else {
            throw new Error("El tipo de datos es incorrecto");
        }
    }

    removeItem(idBook) {
        let posicionLibro = this.data.findIndex(book => book.id === idBook);

        if(posicionLibro !== -1) {

            //Actualizacion localStorage
            let carritoStorage = JSON.parse(localStorage.getItem("carrito"))
            carritoStorage.splice(posicionLibro,1)
            localStorage.setItem("carrito", JSON.stringify(carritoStorage))

            //Actualizacion this.data
            this.data.splice(posicionLibro,1);

            return true;
        } else {
            throw new Error("No se ha encontrado el libro");
        }
    }

    empty() {
        this.data = [];
        localStorage.setItem("carrito", JSON.stringify([]))
    }

    toString() {
        return this.data.map(book => book.toString()).join("\n\n");
    }
}
