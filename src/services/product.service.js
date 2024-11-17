import { instanceAxios } from './instanceAxios';

export const getAllProducts = async (queries) => {
    const params = new URLSearchParams(queries).toString();
    return instanceAxios.get(`/products?${params}`).then((res) => res.data);
};

export const getProductById = async (id) => {
    return instanceAxios.get(`/products/admin/${id}`).then((res) => res.data);
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
export const updateProduct = async ({ id, data }) => {
    return instanceAxios
        .put('/products/admin/' + id, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((res) => res.data);
};

export const deleteProduct = async (id) => {
    return instanceAxios
        .delete(`/products/admin/${id}`)
        .then((res) => res.data);
};
