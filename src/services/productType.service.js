import axios from 'axios';
import { instanceAxios } from './instanceAxios';

const API_URL = import.meta.env.VITE_API_URL;

export const getAllProductTypes = async (queries) => {
    const params = new URLSearchParams(queries).toString();
    return instanceAxios.get(`/types?${params}`).then((res) => res.data);
};

export const addProductType = async (data) => {
    return instanceAxios
        .post(API_URL + '/types/admin', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((res) => res.data);
};

export const deleteProductType = async (id) => {
    return instanceAxios.delete(`/types/admin/${id}`).then((res) => res.data);
};
