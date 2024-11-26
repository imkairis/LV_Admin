import { instanceAxios } from './instanceAxios';

export const getAllTargets = async (queries) => {
    const params = new URLSearchParams(queries).toString();
    return instanceAxios.get(`/targets?${params}`).then((res) => res.data);
};

export const addTargets = async (data) => {
    return instanceAxios
        .post('/targets/admin', data)
        .then((res) => res.data);
};

export const updateTargets = async ({ _id, ...data }) => {
    return instanceAxios
        .put('/targets/admin/' + _id, data)
        .then((res) => res.data);
};

export const deleteTargets = async (id) => {
    return instanceAxios.delete(`/targets/admin/${id}`).then((res) => res.data);
};
