import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.globix.app.br', // URL base do back-end
    headers: {
        'Content-Type': 'application/json',
    },
});

export { axios }; // Exporta o axios base para uso de isAxiosError
export default api;
