import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001', // URL base do back-end
    headers: {
        'Content-Type': 'application/json',
    },
});

const apiUpload = axios.create({
    baseURL: 'http://localhost:3001',
    // Não defina headers aqui!
});

export { axios, apiUpload }; // Exporta o axios base para uso de isAxiosError
export default api;