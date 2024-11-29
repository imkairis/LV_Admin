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
                    <div className="w-full md:w-1/2 bg-white dark:bg-navy-700 p-6 rounded-lg shadow-lg">
                        <div className="flow-root">
                            <dl className="-my-3 divide-y divide-gray-100 text-sm">
                                {/* Tên sản phẩm */}
                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">
                                        Tên sản phẩm
                                    </dt>
                                    <dd className="text-gray-700 sm:col-span-2">
                                        {data?.data?.name}
                                    </dd>
                                </div>

                                {/* Giá sản phẩm */}
                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">
                                        Giá
                                    </dt>
                                    <dd className="text-gray-700 sm:col-span-2">
                                        {parseInt(
                                            data?.data?.price
                                        ).toLocaleString('vi-VN')}{' '}
                                        VND
                                    </dd>
                                </div>
                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">
                                        Trạng thái
                                    </dt>
                                    <dd className="text-gray-700 sm:col-span-2">
                                        {data?.data?.status}
                                    </dd>
                                </div>

                                {/* Mô tả sản phẩm */}
                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">
                                        Mô tả
                                    </dt>
                                    <dd className="text-gray-700 sm:col-span-2">
                                        {data?.data?.description}
                                    </dd>
                                </div>

                                {/* Đối tượng người dùng */}
                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">
                                        Đối tượng sử dụng
                                    </dt>
                                    <dd className="text-gray-700 sm:col-span-2">
                                        {data?.data?.targetAudience?.name}
                                    </dd>
                                </div>

                                {/* Nhóm tuổi */}
                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">
                                        Độ tuổi sử dụng
                                    </dt>
                                    <dd className="text-gray-700 sm:col-span-2">
                                        {data?.data?.ageGroup?.name}
                                    </dd>
                                </div>

                                {/* Ngày sản xuất */}
                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">
                                        Ngày sản xuất
                                    </dt>
                                    <dd className="text-gray-700 sm:col-span-2">
                                        {formatDate(
                                            data?.data?.dateOfManufacture
                                        )}
                                    </dd>
                                </div>

                                {/* Hạn sử dụng */}
                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">
                                        Hạn sử dụng
                                    </dt>
                                    <dd className="text-gray-700 sm:col-span-2">
                                        {formatDate(data?.data?.expirationDate)}
                                    </dd>
                                </div>

                                {/* Cân nặng */}
                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">
                                        Khối lượng
                                    </dt>
                                    <dd className="text-gray-700 sm:col-span-2">
                                        {data?.data?.weight}
                                    </dd>
                                </div>

                                {/* Thành phần */}
                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">
                                        Thành phần
                                    </dt>
                                    <dd className="text-gray-700 sm:col-span-2">
                                        {data?.data?.element}
                                    </dd>
                                </div>

                                {/* Nguồn gốc */}
                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">
                                        Nguồn gốc
                                    </dt>
                                    <dd className="text-gray-700 sm:col-span-2">
                                        {data?.data?.origin}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

export default ProductDetail;

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
