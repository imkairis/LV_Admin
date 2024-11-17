import React, { forwardRef } from 'react';
import { formatPrice } from '~/lib/utils';

const Invoice = forwardRef(({ order }, ref) => {
    const addressOrder = () => {
        const json = JSON.parse(order?.address);
        return {
            name: json.name,
            phone: json.phone,
            address: json.address,
        };
    };

    return (
        <div ref={ref} className="p-6 bg-white">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold">Hóa Đơn</h2>
                <p className="text-gray-600">
                    Ngày: {new Date().toLocaleDateString()}
                </p>
            </div>
            <div className="mb-8">
                <h3 className="font-semibold text-lg mb-4">
                    Thông Tin Đơn Hàng
                </h3>
                <p>Mã đơn hàng: {order?._id}</p>
                <p>Khách hàng: {order?.user?.fullname}</p>
                <p>Email: {order?.user?.email}</p>
            </div>
            <div className="mb-8">
                <h3 className="font-semibold text-lg mb-4">
                    Thông Tin Giao Hàng
                </h3>
                <p>Người nhận: {addressOrder().name}</p>
                <p>Số điện thoại: {addressOrder().phone}</p>
                <p>Địa chỉ: {addressOrder().address}</p>
            </div>
            <div className="mb-8">
                <h3 className="font-semibold text-lg mb-4">
                    Danh Sách Sản Phẩm
                </h3>
                {order?.items?.map((product, index) => (
                    <div
                        key={index}
                        className="flex justify-between border-t pt-4"
                    >
                        <div>
                            <p>Tên sản phẩm: {product?.product?.name}</p>
                            <p>Số lượng: {product.quantity}</p>
                        </div>
                        <p>Giá: {formatPrice(product?.product?.price)}</p>
                    </div>
                ))}
            </div>
            <div>
                <h3 className="font-semibold text-lg">
                    Tổng tiền: {formatPrice(order?.totalPrice)}
                </h3>
            </div>
        </div>
    );
});

export default Invoice;
