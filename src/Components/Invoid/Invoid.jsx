import React, { useRef } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { formatPrice } from '~/lib/utils'; // Bạn có thể thay đổi đường dẫn nếu cần
import { ProductImage } from '~/Components/common'; // Đảm bảo đường dẫn đúng

const Invoice = ({ order }) => {
    const printRef = useRef();

    const handleDownloadPDF = () => {
        const doc = new jsPDF();

        // Thiết lập font chữ
        doc.setFont('times', 'normal');
        doc.setFontSize(12);

        // Tiêu đề
        doc.text('HÓA ĐƠN ĐẶT HÀNG', 20, 20);

        // Dữ liệu đơn hàng
        let yPosition = 30;
        doc.text(`Mã đơn hàng: ${order._id}`, 20, yPosition);
        yPosition += 10;
        doc.text(`Tên khách hàng: ${order.user.fullname}`, 20, yPosition);
        yPosition += 10;
        doc.text(`Email: ${order.user.email}`, 20, yPosition);
        yPosition += 10;

        // Địa chỉ giao hàng
        const addressOrder = JSON.parse(order.address);
        doc.text(`Tên: ${addressOrder.name}`, 20, yPosition);
        yPosition += 10;
        doc.text(`Số điện thoại: ${addressOrder.phone}`, 20, yPosition);
        yPosition += 10;
        doc.text(`Địa chỉ: ${addressOrder.address}`, 20, yPosition);
        yPosition += 10;

        // Thông tin thời gian và phương thức thanh toán
        doc.text(
            `Thời gian đặt hàng: ${new Date(order.createdAt).toLocaleString()}`,
            20,
            yPosition
        );
        yPosition += 10;
        doc.text(`Tổng tiền: ${formatPrice(order.totalPrice)}`, 20, yPosition);
        yPosition += 10;
        doc.text(`Trạng thái: ${order.deliveryStatus}`, 20, yPosition);
        yPosition += 10;
        doc.text(`Phương thức thanh toán: ${order.payment}`, 20, yPosition);
        yPosition += 10;

        // Bảng thông tin sản phẩm
        const tableData = order.items.map((product) => ({
            'Tên sản phẩm': product.product.name,
            'Số lượng': product.quantity,
            Giá: formatPrice(product.product.price),
        }));

        doc.autoTable({
            startY: yPosition + 10, // Vị trí bắt đầu bảng
            head: [['Tên sản phẩm', 'Số lượng', 'Giá']],
            body: tableData,
            theme: 'grid',
        });

        // Lưu tệp PDF
        doc.save('order_invoice.pdf');
    };

    return (
        <div ref={printRef} className="p-6 bg-white shadow-lg rounded-lg">
            {/* Thông tin đơn hàng */}
            <h2 className="text-2xl font-semibold text-blue-600">
                Thông tin đơn hàng
            </h2>
            <div className="mt-4">
                <p>
                    <strong>Mã đơn hàng:</strong> {order._id}
                </p>
                <p>
                    <strong>Tên khách hàng:</strong> {order.user.fullname}
                </p>
                <p>
                    <strong>Email:</strong> {order.user.email}
                </p>
                <p>
                    <strong>Địa chỉ:</strong>{' '}
                    {JSON.parse(order.address)?.address}
                </p>
                <p>
                    <strong>Thời gian đặt hàng:</strong>{' '}
                    {new Date(order.createdAt).toLocaleString()}
                </p>
                <p>
                    <strong>Tổng tiền:</strong> {formatPrice(order.totalPrice)}
                </p>
                <p>
                    <strong>Trạng thái:</strong> {order.deliveryStatus}
                </p>
                <p>
                    <strong>Phương thức thanh toán:</strong> {order.payment}
                </p>
            </div>

            {/* Sản phẩm */}
            <h3 className="mt-8 text-xl font-semibold">Danh sách sản phẩm</h3>
            <div className="mt-4">
                {order.items.map((product, index) => (
                    <div key={index} className="flex items-center mb-4">
                        <ProductImage
                            src={product.product.images[0]}
                            alt={product.product.name}
                            className="w-20 h-20 object-cover"
                        />
                        <div className="ml-4">
                            <p>
                                <strong>Tên sản phẩm:</strong>{' '}
                                {product.product.name}
                            </p>
                            <p>
                                <strong>Số lượng:</strong> {product.quantity}
                            </p>
                            <p>
                                <strong>Giá:</strong>{' '}
                                {formatPrice(product.product.price)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Nút in hóa đơn */}
            <button
                onClick={handleDownloadPDF}
                className="bg-blue-500 text-white p-2 rounded mt-6"
            >
                Tải hóa đơn PDF
            </button>
        </div>
    );
};

export default Invoice;
