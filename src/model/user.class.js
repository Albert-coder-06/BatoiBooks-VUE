export default class User {

    constructor(id, nick, email, password) {
        this.id = id;
        this.email = email;
        this.nick = nick;
        this.password = password;
    }

    

    toString() {
        return "ID: " + this.id + 
        "\nNick: " + this.nick + 
        "\nEmail: " + this.email + 
        "\nPassword: " + this.password;
    }

}