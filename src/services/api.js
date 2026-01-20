import axios from 'axios';
const SERVER_URL = 'http://localhost:3001';

const fetchBooks = async () => {
    try {
        const response = await axios.get(`${SERVER_URL}/books`);
        return { success: true, data: response.data };
    } catch (error) {
        const message = error.response
            ? `${error.response.status} ${error.response.data.message || 'Error del servidor'}`
            : 'No se pudo conectar con el servidor';
        return { success: false, message };
    }
};

const addBook = async (book) => {
    try {
        const response = await axios.post(`${SERVER_URL}/books`, book);
        return { success: true, data: response.data };
    } catch (error) {
        const message = error.response
            ? `${error.response.status} ${error.response.data.message || 'Error al añadir'}`
            : 'No se pudo conectar con el servidor';
        return { success: false, message };
    }
};

const removeBook = async (bookId) => {

    try {
        await axios.delete(`${SERVER_URL}/books/${bookId}`);
        return { success: true, message: "Libro eliminado correctamente" };
    } catch (error) {
        if (error.response) {
            return { success: false, message: error.response.status + " " + error.response.data.message };
        }
    }

};

export { fetchBooks, addBook, removeBook };