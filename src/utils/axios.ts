import axios from 'axios';

const api = axios.create({
    baseURL: 'https://globix-afaea8fe15ce.herokuapp.com', // URL base do back-end
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;