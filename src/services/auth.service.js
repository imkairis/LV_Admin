import { instanceAxios } from './instanceAxios';

export const login = async (username, password) => {
    return instanceAxios.post('/auth/login', {
        username,
        password,
    });
};
