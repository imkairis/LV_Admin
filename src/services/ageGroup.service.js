import { instanceAxios } from './instanceAxios';

export const getAllAges = async (queries) => {
    const params = new URLSearchParams(queries).toString();
    return instanceAxios.get(`/ages?${params}`).then((res) => res.data);
};

export const addAgeGroup = async (data) => {
    return instanceAxios
        .post('/ages/admin', data)
        .then((res) => res.data);
};

export const deleteAgeGroup = async (id) => {
    return instanceAxios.delete(`/ages/admin/${id}`).then((res) => res.data);
};
