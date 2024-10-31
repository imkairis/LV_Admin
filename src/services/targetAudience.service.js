import { instanceAxios } from './instanceAxios';

const API_URL = import.meta.env.VITE_API_URL;

export const getAllTargets = async (queries) => {
    const params = new URLSearchParams(queries).toString();
    return instanceAxios.get(`/targets?${params}`).then((res) => res.data);
};

export const addTargets = async (data) => {
    return instanceAxios
        .post(
            API_URL + '/targets/admin',
            data 
        )
        .then((res) => res.data);
};

export const deleteTargets = async (id) => {
    return instanceAxios.delete(`/targets/admin/${id}`).then((res) => res.data);
};
