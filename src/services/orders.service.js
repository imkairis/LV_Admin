import { instanceAxios } from './instanceAxios';

export const getOrders = async (queries) => {
    const params = new URLSearchParams(queries).toString();
    return instanceAxios.get(`/orders/admin?${params}`).then((res) => res.data);
};

export const updateStatus = async (status) => {
    return instanceAxios.put(`/orders/admin`, {
        deliveryStatus: status,
    });
};

export const getOrderById = async (props) => {
    return instanceAxios
        .get(`/orders/admin/${props.orderId}`)
        .then((res) => res.data);
};
