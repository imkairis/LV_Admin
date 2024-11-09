import { useParams } from 'react-router-dom';
import HeaderPage from '~/Components/HeaderPage';
import { useQueryDefault } from '~/Hooks';
import { formatPrice } from '~/lib/utils';
import { getOrderById } from '~/services';

function OrderDetail() {
    const { orderId } = useParams();
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
            {!isLoading && data && <OrderInfo order={data.data} />}
            {isError && <p>Error: {error?.message || 'Có lỗi xảy ra'}</p>}
        </main>
    );
}

export default OrderDetail;

const OrderInfo = ({ order }) => {
    const addressOrder = () => {
        const json = JSON.parse(order?.address);
        return {
            name: json.name,
            phone: json.phone,
            address: json.address,
        };
    };
    return (
        <div>
            <h2 className="text-lg font-semibold">Thông tin đơn hàng</h2>
            <p>Mã đơn hàng: {order?._id}</p>
            <p>Tên khách hàng: {order?.user?.fullname}</p>
            <p>Email: {order?.user?.email}</p>
            <div className="pl-5">
                <p>Thông tin nhận hàng</p>
                <p>Tên: {addressOrder().name}</p>
                <p>Số điện thoại: {addressOrder().phone}</p>
                <p>Địa chỉ: {addressOrder().address}</p>
            </div>
            <p>Thời gian đặt hàng: {order?.createdAt}</p>
            <p>Tổng tiền: {formatPrice(order?.totalPrice)}</p>
            <p>Trạng thái: {order?.deliveryStatus}</p>
            <p>Phương thức thanh toán: {order?.payment}</p>
            <div>
                <h3 className="text-lg font-semibold">Sản phẩm</h3>
                <div>
                    {order?.items?.map((product, index) => (
                        <div key={index} className="flex gap-4 items-center">
                            <img
                                src={product?.product?.image}
                                alt={product?.product?.name}
                                className="w-20 h-20 object-cover"
                            />
                            <div>
                                <p>Tên sản phẩm: {product?.product?.name}</p>
                                <p>Số lượng: {product?.quantity}</p>
                                <p>
                                    Giá: {formatPrice(product?.product?.price)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
