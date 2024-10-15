import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getAllProductTypes = async (props) => {
    const { token, ...rest } = props;
    const url = new URL(API_URL + '/types');
    url.search = new URLSearchParams(rest).toString();
    return axios
        .get(url.toString(), {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => res.data);
};

export const addProductType = async (props) => {
    const { token, ...data } = props;
    return axios
        .post(API_URL + '/types/admin', data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => res.data);
};

export const deleteProductType = async (props) => {
    const { token, id } = props;
    return axios
        .delete(API_URL + `/types/admin/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => res.data);
};
