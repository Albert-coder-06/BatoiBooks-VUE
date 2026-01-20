import axios from 'axios';
const SERVER_URL = 'http://localhost:3001';

const fetchBooks = async () => {
    const response = await axios.get(`${SERVER_URL}/books`);
    return response.data;
};

const addBook = async (book) => {
    const response = await axios.post(`${SERVER_URL}/todos`, book);
    return response.data;
};

const removeBook = async (bookId) => {
    await axios.delete(`${SERVER_URL}/books/${bookId}`);
};

const toggleTodoDone = async (todoId, done) => {
    const response = await axios.patch(`${SERVER_URL}/todos/${todoId}`, { done });
    return response.data;
}

export { fetchBooks, addBook, removeBook, toggleTodoDone };