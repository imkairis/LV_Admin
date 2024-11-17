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
        queryFn: () =>
            getProductById(productId, {
                populate: 'targetAudience,ageGroup,type',
            }),
        ...configQuery,
    });

    return (
        <main className="py-8">
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
                    <div className="w-full md:w-1/2 bg-white dark:bg-navy-700 p-6 rounded-lg shadow-lg flex flex-col justify-between">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                            Name: {data?.data?.name}
                        </h2>
                        <p className="text-lg text-red-600 mt-2 dark:text-white">
                            Price:{' '}
                            {parseInt(data?.data?.price).toLocaleString(
                                'vi-VN'
                            )}{' '}
                            VND
                        </p>
                        <p className="text-sm text-gray-900 dark:text-white">
                            Type: {data?.data?.type?.name}
                        </p>
                        <p className="text-sm text-gray-900 dark:text-white">
                            Quantity: {data?.data?.quantity}
                        </p>
                        <p className="text-sm text-gray-900 dark:text-white">
                            Cost: {data?.data?.cost}
                        </p>
                        <p className="text-sm text-gray-900 dark:text-white">
                            Stock quantity: {data?.data?.stockQuantity}
                        </p>
                        <p className="text-sm text-gray-900 dark:text-white">
                            Description: {data?.data?.description}
                        </p>
                        <p className="text-sm text-gray-900 dark:text-white">
                            User manual: {data?.data?.userManual}
                        </p>
                        <p className="text-sm text-gray-900 dark:text-white">
                            Weight: {data?.data?.weight}
                        </p>
                        <p className="text-sm text-gray-900 dark:text-white">
                            Element: {data?.data?.element}
                        </p>
                        <p className="text-sm text-gray-900 dark:text-white">
                            Origin: {data?.data?.origin}
                        </p>
                        <p className="text-sm text-gray-900 dark:text-white">
                            Date of manufacture:{' '}
                            {formatDate(data?.data?.dateOfManufacture)}
                        </p>
                        <p className="text-sm text-gray-900 dark:text-white">
                            Expiration date:{' '}
                            {formatDate(data?.data?.expirationDate)}
                        </p>
                        <p className="text-sm text-gray-900 dark:text-white">
                            Target audience: {data?.data?.targetAudience?.name}
                        </p>
                        <p className="text-sm text-gray-900 dark:text-white">
                            Age group: {data?.data?.ageGroup?.name}
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
