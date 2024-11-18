import React, { forwardRef } from 'react';
import { useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { ProductImage } from '~/Components/common';
import HeaderPage from '~/Components/HeaderPage';
import { STATUS_ORDER } from '~/Constants';
import { useMutationAndToast, useQueryDefault } from '~/Hooks';
import { formatPrice } from '~/lib/utils';
import { getOrderById, updateStatusOrder } from '~/services';

function OrderDetail() {
    const { orderId } = useParams();
    const { data, isLoading, error, isError } = useQueryDefault({
        keys: ['order', orderId],
        fn: () => getOrderById({ orderId }),
        option: {
            slateTime: Infinity,
        },
    });
    const mutation = useMutationAndToast({
        fn: updateStatusOrder,
        keys: ['order', orderId],
        failString: 'Có lỗi xảy ra',
        loadingString: 'Đang xử lý...',
        successString: 'Cập nhật thành công',
        onSuccess: () => console.log('Order detail updated!'),
    });

    // Handle Print
    const printRef = React.useRef();

    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: 'Order Invoice',
        onAfterPrint: () => console.log('Invoice printed successfully!'),
    });

    const handleUpdateStatusOrder = (status) => {
        mutation.mutate({ status, id: orderId });
    };

    return (
        <main className="p-6">
            <HeaderPage title="Chi tiết đơn hàng" />
            <div className="flex justify-between">
                <button
                    onClick={handlePrint}
                    className="bg-blue-500 dark:bg-navy-600 text-white p-2 rounded mb-6"
                >
                    In hóa đơn
                </button>

                <div className="flex gap-2">
                    {data?.data?.deliveryStatus === STATUS_ORDER.PENDING ? (
                        <>
                            <button
                                onClick={() =>
                                    handleUpdateStatusOrder(
                                        STATUS_ORDER.SHIPPING
                                    )
                                }
                                className="bg-blue-500 dark:bg-navy-600 text-white p-2 rounded mb-6"
                            >
                                Vận chuyển
                            </button>
                            <button
                                onClick={() =>
                                    handleUpdateStatusOrder(STATUS_ORDER.FAILED)
                                }
                                className="bg-red-500 text-white p-2 rounded mb-6"
                            >
                                Hủy đơn hàng
                            </button>
                        </>
                    ) : null}
                </div>
            </div>
            {isLoading && <p>Loading...</p>}
            {!isLoading && data && (
                <OrderInfo order={data.data} ref={printRef} />
            )}
            {isError && <p>Error: {error?.message || 'Có lỗi xảy ra'}</p>}
        </main>
    );
}

export default OrderDetail;

// eslint-disable-next-line react/display-name
const OrderInfo = forwardRef(({ order }, printRef) => {
    const addressOrder = () => {
        const json = JSON.parse(order?.address);
        return {
            name: json.name,
            phone: json.phone,
            address: json.address,
        };
    };

    return (
        <div className="" ref={printRef}>
            {/* Đảm bảo in đúng phần này */}
            {/* Order Information - Container */}
            <div className="bg-white dark:bg-navy-700 p-6 mb-8 rounded-lg shadow-sm">
                <div className="space-y-4 text-center">
                    <h2 className="text-2xl font-semibold text-blue-600">
                        Thông tin đơn hàng
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
                    {/* Order Information */}
                    <div className="space-y-4">
                        <p>
                            <span className="font-medium">Mã đơn hàng:</span>{' '}
                            {order?._id}
                        </p>
                        <p>
                            <span className="font-medium">Tên khách hàng:</span>{' '}
                            {order?.user?.fullname}
                        </p>
                        <p>
                            <span className="font-medium">Email:</span>{' '}
                            {order?.user?.email}
                        </p>
                    </div>

                    {/* Delivery Information */}
                    <div className="space-y-4">
                        <p>
                            <span className="font-medium">Tên người nhận:</span>{' '}
                            {addressOrder().name}
                        </p>
                        <p>
                            <span className="font-medium">Số điện thoại:</span>{' '}
                            {addressOrder().phone}
                        </p>
                        <p>
                            <span className="font-medium">Địa chỉ:</span>{' '}
                            {addressOrder().address}
                        </p>
                    </div>

                    {/* Order Time, Total, Payment and Status */}
                    <div className="space-y-4">
                        <p>
                            <span className="font-medium">
                                Thời gian đặt hàng:
                            </span>{' '}
                            {new Date(order?.createdAt).toLocaleString()}
                        </p>
                        <p>
                            <span className="font-medium">Tổng tiền:</span>{' '}
                            {formatPrice(order?.totalPrice)}
                        </p>
                        <p>
                            <span className="font-medium">Trạng thái:</span>{' '}
                            {order?.deliveryStatus === STATUS_ORDER.PENDING
                                ? 'Chờ xác nhận'
                                : ''}
                            {order?.deliveryStatus === STATUS_ORDER.SHIPPING
                                ? 'Đang giao'
                                : ''}
                            {order?.deliveryStatus === STATUS_ORDER.DELIVERED
                                ? 'Đã giao'
                                : ''}
                            {order?.deliveryStatus === STATUS_ORDER.FAILED
                                ? 'Đã hủy'
                                : ''}
                        </p>
                        <p>
                            <span className="font-medium">
                                Phương thức thanh toán:
                            </span>{' '}
                            {order?.payment}
                        </p>
                    </div>
                </div>
            </div>
            {/* Product Information - Container */}
            <div className="bg-white dark:bg-navy-700 p-6 mb-8 rounded-lg shadow-sm">
                <div className="space-y-4 text-center">
                    <h3 className="mb-6 text-2xl font-semibold">Sản phẩm</h3>
                </div>

                <div>
                    {order?.items?.map((product, index) => (
                        <div
                            key={index}
                            className="flex gap-4 items-center pt-4 border-t"
                        >
                            <ProductImage
                                src={product?.product?.images[0]}
                                alt={product?.product?.name}
                                className="w-20 h-20 object-cover"
                            />
                            <div className="flex-grow">
                                <p className="text-left">
                                    <span className="font-medium">
                                        Tên sản phẩm:
                                    </span>{' '}
                                    {product?.product?.name}
                                </p>
                                <p className="text-left">
                                    <span className="font-medium">
                                        Số lượng:
                                    </span>{' '}
                                    {product?.quantity}
                                </p>
                                <p className="text-left">
                                    <span className="font-medium">Giá:</span>{' '}
                                    {formatPrice(product?.product?.price)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});
