import { instanceAxios } from './instanceAxios';

export const getAllProducts = async (queries) => {
    const params = new URLSearchParams(queries).toString();
    return instanceAxios.get(`/products?${params}`).then((res) => res.data);
};

export const createProduct = async (data) => {
    return instanceAxios
        .post('/products/admin', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((res) => res.data);
};
