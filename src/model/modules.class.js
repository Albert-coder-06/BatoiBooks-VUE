import Module from './module.class.js';
import * as api from '../services/api.js';
export default class Modules {

    constructor() {
        this.data = [];
    }

    async populate() {
        
        let modules = await api.getDBModules();
        
        if (modules !== false) {
            modules.forEach(modulo => this.data.push(new Module(modulo.code, modulo.cliteral, modulo.vliteral, modulo.courseId)))
        } else {
            throw new Error("Error en la poblacion");
        }
        
    }
    
    
    addModule(module) {
        this.data.push(module);
        return module;
    }

    removeModuler(id) {
        let posicion = this.data.findIndex(module => module.id === id);
        if (posicion != -1) {
            this.data.splice(posicion, 1);
        } else {
            throw new Error();
        }
    }

    changeModule(module) {
        let idUser = book.id;

        let posicion = this.data.findIndex(user => user.id === idUser);

        if (posicion != -1) {
            return this.data.splice(idUser, 1, user);
        } else {
            throw new Error();
        }
    }

    toString() {
        let salida = "";

        this.data.forEach(user => salida += user.toString() + "\n\n");

        return salida;
    }
    
    getModuleByCode(moduleCode) {
    
        let busqueda = this.data.find(modulo => modulo.code === moduleCode);

        if (busqueda === undefined) {
            throw new Error();
        }

        return busqueda;
    }

}