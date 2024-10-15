import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getAllProducts = async () => {
    return axios(API_URL + '/products').then((res) => res.data);
};
