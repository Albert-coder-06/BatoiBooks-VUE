import User from './user.class.js';
import * as api from '../services/api.js'
export default class Users {

    constructor() {
        this.data = [];
    }

    async populate() {
        let users = await api.getDBUsers();

        if (users !== false) {
            users.forEach(usuario => this.data.push(new User(usuario.id, usuario.nick, usuario.email, usuario.password)))
        } else {
            throw new Error("Error en la poblacion");
        }
    }

    async addUser(user) {
        let usuarioNuevo = new User(user.id, user.nick, user.email, user.password);
        if(user.id === undefined && this.data.length === 0) {
            usuarioNuevo.id = 1;
        } else {
            let usuarioUltimoId = this.data.reduce((usuarioMaxId, usuario) => usuarioMaxId.id > usuario.id ? usuarioMaxId : usuario);
            usuarioNuevo.id = usuarioUltimoId.id + 1
        }

        let responseUser = await api.addDBUser(user);

        if (responseUser !== false) {
            this.data.push(usuarioNuevo);
        } else {
            throw new Error("No se ha podido añadir el usuario");
        }

        return usuarioNuevo;
    }

    async removeUser(id) {
        let busquedaPosicion = this.data.findIndex(user => user.id === id);

        if (busquedaPosicion !== -1) {
            let response = await api.removeDBUser(id);
            
            if (response !== false) {
                this.data.splice(busquedaPosicion, 1);
            } else {
                throw new Error("Error en la eliminacion del usuario");
            }
            
        } else {
            throw new Error("No se ha encontrado el libro");
        }
    }

    async changeUser(user) {
        let idUser = user.id;

        let busquedaPosicion = this.data.findIndex(user => user.id === idUser);

        if (busquedaPosicion !== -1) {

            let response = await api.changeDBUser(user);

            if (response !== false) {

                if(user instanceof User) {
                    this.data.splice(busquedaPosicion, 1, user);
                    return user;

                } else {
                    let usuarioCambiado = new User(user.id, user.nick, user.email, user.password);
                    this.data.splice(busquedaPosicion,1,usuarioCambiado);
                    return usuarioCambiado;
                }   

            } else {
                throw new Error("Error en la actualizacion del usuario")
            }
        } else {
            throw new Error();
        }
    }

    toString() {
        let salida = "";

        this.data.forEach(user => salida += user.toString() + "\n\n");

        return salida;
    }

    async getUserById(userId) {

        let response = await api.getDBUser(userId);

        if(response !== false) {
            let usuarioRespuesta = new User(response.id, response.nick, response.email, response.password)
            return usuarioRespuesta;
        } else {
            throw new Error();
        }
    }

    getUserIndexById(userId) {
        let busqueda = this.data.findIndex(usuario => usuario.id === userId);

        if (busqueda === -1) {
            throw new Error();
        }

        return busqueda;
    }

    getUserByNickName(nick) {
        let busqueda = this.data.find(usuario => usuario.nick === nick);

        if (busqueda === undefined) {
            throw new Error();
        }

        return busqueda;
    }

    async changeUserPassword(idUser, password) {
        let busquedaPosicion = this.data.findIndex(user => user.id === idUser);
        let usuario = this.data[busquedaPosicion];

        if (busquedaPosicion !== -1) {

            let response = await api.changeDBUserPassword(idUser, password);

            if (response !== false) {
                
                let usuarioCambiado = new User(usuario.id, usuario.nick, usuario.email, password);
                this.data.splice(busquedaPosicion, 1, usuarioCambiado);
                return usuarioCambiado;

            } else {
                throw new Error("Error en la actualizacion de la contraseña del usuario")
            }
        } else {
            throw new Error();
        }
    }
}