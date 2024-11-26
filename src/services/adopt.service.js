import { instanceAxios } from './instanceAxios';

export const getAllAdopts = async (queries) => {
    const params = new URLSearchParams(queries).toString();
    return instanceAxios.get(`/donations?${params}`).then((res) => res.data);
};

export const updateStatusAdopt = async ({ id, status }) => {
    const formData = new FormData();
    formData.append('status', status);
    return instanceAxios.put('/donations/' + id, formData).then((res) => res.data);
};

export const getAdoptDetails = async (id) => {
    return instanceAxios.get(`/donations/${id}`).then((res) => res.data);
};