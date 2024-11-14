import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { ProductImage, Skeleton } from '~/Components/common';
import HeaderPage from '~/Components/HeaderPage';
import Slider from '~/Components/Slider';
import { configQuery } from '~/Hooks';
import { formatDate } from '~/lib/utils';
import { getProductById } from '~/services';

function ProductDetail() {
    const { productId } = useParams();
    const { data, isLoading } = useQuery({
        queryKey: ['product', productId],
        queryFn: () => getProductById(productId),
        ...configQuery,
    });

    return (
        <main className="bg-gray-50 py-8">
            <HeaderPage title="Product Detail" />
            {isLoading && <LoadingProductDetail />}
            {!isLoading && data && (
                <div className="flex justify-center gap-8">
                    {/* Hình ảnh */}
                    <div className="w-full md:w-1/2">
                        <Slider
                            config={{
                                infinite: true,
                                autoScroll: 5000,
                            }}
                            data={data?.data?.images}
                            renderItem={(src) => (
                                <ProductImage
                                    src={src}
                                    alt={data?.data?.name}
                                    className="max-w-full rounded-lg"
                                />
                            )}
                        />
                    </div>

                    {/* Chi tiết sản phẩm */}
                    <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Name: {data?.data?.name}
                        </h2>
                        <p className="text-lg text-red-600 mt-2">
                            Price:{' '}
                            {parseInt(data?.data?.price).toLocaleString(
                                'vi-VN'
                            )}{' '}
                            VND
                        </p>
                        <p className="text-sm text-gray-900">
                            Type: {data?.data?.type}
                        </p>
                        <p className="text-sm text-gray-900">
                            Quantity: {data?.data?.quantity}
                        </p>
                        <p className="text-sm text-gray-900">
                            Cost: {data?.data?.cost}
                        </p>
                        <p className="text-sm text-gray-900">
                            Stock quantity: {data?.data?.stockQuantity}
                        </p>
                        <p className="text-sm text-gray-900">
                            Description: {data?.data?.description}
                        </p>
                        <p className="text-sm text-gray-900">
                            User manual: {data?.data?.userManual}
                        </p>
                        <p className="text-sm text-gray-900">
                            Weight: {data?.data?.weight}
                        </p>
                        <p className="text-sm text-gray-900">
                            Element: {data?.data?.element}
                        </p>
                        <p className="text-sm text-gray-900">
                            Origin: {data?.data?.origin}
                        </p>
                        <p className="text-sm text-gray-900">
                            Date of manufacture:{' '}
                            {formatDate(data?.data?.dateOfManufacture)}
                        </p>
                        <p className="text-sm text-gray-900">
                            Expiration date:{' '}
                            {formatDate(data?.data?.expirationDate)}
                        </p>
                        <p className="text-sm text-gray-900">
                            Target audience: {data?.data?.targetAudience}
                        </p>
                        <p className="text-sm text-gray-900">
                            Age group: {data?.data?.ageGroup}
                        </p>
                    </div>
                </div>
            )}
        </main>
    );
}

export default ProductDetail;
export const formatPrice = (value) => {
    if (!value) return '0 VND'; // Trường hợp giá trị không hợp lệ
    const numberFormat = new Intl.NumberFormat('vi-VN'); // Định dạng số cho tiếng Việt
    return `${numberFormat.format(value)} VND`; // Thêm "VND" vào cuối
};

const LoadingProductDetail = () => {
    return (
        <div className="flex justify-center items-center h-96 w-full space-y-2">
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
        </div>
    );
};
