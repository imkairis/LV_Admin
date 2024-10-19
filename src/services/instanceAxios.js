import axios from 'axios';
import { KEYS } from '~/Constants';

const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/v1';

export const instanceAxios = axios.create({
    baseURL: baseUrl,
    timeout: 1000,
});

instanceAxios.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem(KEYS.TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);
