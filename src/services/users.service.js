import { instanceAxios } from './instanceAxios';

export const getUsers = async (queries) => {
    const params = new URLSearchParams(queries).toString();
    return instanceAxios.get(`/accounts?${params}`).then((res) => res.data);
};

export const updateStatusUser = async ({ status, id }) => {
    return instanceAxios.put(`/accounts/` + id, {
        status: status,
    });
};
