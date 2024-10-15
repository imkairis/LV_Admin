import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getAllTargets = async (props) => {
    const { token, ...rest } = props;
    const url = new URL(API_URL + '/targets');
    url.search = new URLSearchParams(rest).toString();
    return axios(url.toString(), {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    }).then((res) => res.data);
};

export const addTargets = async (props) => {
    const { token, ...data } = props;
    return axios
        .post(API_URL + '/targets/admin', data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => res.data);
};

export const deleteTargets = async (props) => {
    const { token, id } = props;
    return axios
        .delete(API_URL + `/targets/admin/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => res.data);
};
