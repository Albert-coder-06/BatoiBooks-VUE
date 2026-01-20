export default class Book {

    constructor(book) {
        this.id = Number(book.id) || 0;
        this.userId = book.userId || 0;
        this.moduleCode = book.moduleCode;
        this.publisher = book.publisher;
        this.price = book.price;
        this.pages = book.pages;
        this.status = book.status;

        if (book.photo === undefined) {
            this.photo = "";
        } else {
            this.photo = book.photo;
        }

        if (book.comments === undefined) {
            this.comments = "";
        } else {
            this.comments = book.comments;
        }

        if (book.soldDate === undefined) {
            this.soldDate = "";
        } else {
            this.soldDate = book.soldDate;
        }
        
        
        
    }

    toString() {
        return "ID: " + this.id + 
        "\nUserID: " + this.userId + 
        "\nModule Code: " + this.moduleCode + 
        "\nPublisher: " + this.publisher + 
        "\nPrice: " + this.price + 
        "\nPages: " + this.pages + 
        "\nStatus: " + this.status + 
        "\nPhoto: " + this.photo + 
        "\nComments: " + this.comments + 
        "Sold date: " + this.soldDate;
    }

    getId() {
        return this.id;
    }

    clone() {
        return new Book({ ...this });
    }


   
}

