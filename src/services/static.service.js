import { instanceAxios } from './instanceAxios';

export const getStatic = async () => {
    return instanceAxios.get(`/statics`).then((res) => res.data);
};
