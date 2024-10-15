import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getAllAges = async (props) => {
    const { token, ...rest } = props;
    const url = new URL(API_URL + '/ages');
    url.search = new URLSearchParams(rest).toString();
    return axios(url.toString(), {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    }).then((res) => res.data);
};

export const addAgeGroup = async (props) => {
    const { token, ...data } = props;
    return axios
        .post(API_URL + '/ages/admin', data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => res.data);
};

export const deleteAgeGroup = async (props) => {
    const { token, id } = props;
    return axios
        .delete(API_URL + `/ages/admin/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => res.data);
};
