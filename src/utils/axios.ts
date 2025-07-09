import axios from 'axios';

const api = axios.create({
    baseURL: 'https://globix-afaea8fe15ce.herokuapp.com', // URL base do back-end
    headers: {
        'Content-Type': 'application/json',
    },
});

const apiUpload = axios.create({
    baseURL: 'https://globix-afaea8fe15ce.herokuapp.com',
});

export { axios, apiUpload }; // Exporta o axios base para uso de isAxiosError
export default api;