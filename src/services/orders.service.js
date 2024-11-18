import { instanceAxios } from './instanceAxios';

export const getOrders = async (queries) => {
    const params = new URLSearchParams(queries).toString();
    return instanceAxios.get(`/orders/admin?${params}`).then((res) => res.data);
};

export const updateStatusOrder = async ({ status, id }) => {
    return instanceAxios.put(`/orders/admin/` + id, {
        deliveryStatus: status,
    });
};

export const getOrderById = async (props) => {
    return instanceAxios
        .get(`/orders/order-detail/${props.orderId}`)
        .then((res) => res.data);
};
