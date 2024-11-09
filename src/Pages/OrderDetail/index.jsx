import { useParams } from 'react-router-dom';
import HeaderPage from '~/Components/HeaderPage';
import { useQueryDefault } from '~/Hooks';
import { getOrderById } from '~/services';

function OrderDetail() {
    const { orderId } = useParams();
    console.log('orderId', orderId);
    const { data, isLoading, error, isError } = useQueryDefault({
        keys: ['order', orderId],
        fn: () => getOrderById({ orderId }),
        option: {
            slateTime: Infinity,
        },
    });

    return (
        <main>
            <HeaderPage title="Chi tiết đơn hàng" />
            {isLoading && <p>Loading...</p>}
            {!isLoading && data && <div>{JSON.stringify(data)}</div>}
            {isError && <p>Error: {error?.message || 'Có lỗi xảy ra'}</p>}
        </main>
    );
}

export default OrderDetail;
