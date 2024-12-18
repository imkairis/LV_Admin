import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { ProductImage, Skeleton } from '~/Components/common';
import HeaderPage from '~/Components/HeaderPage';
import Slider from '~/Components/Slider';
import { QUERY_KEYS } from '~/Constants';
import { configQuery } from '~/Hooks';
import { formatDate } from '~/lib/utils';
import { getAdoptDetails } from '~/services';

function AdoptDetail() {
    const { adoptId } = useParams();
    const { data, isLoading } = useQuery({
        queryKey: [QUERY_KEYS.ADOPT_DETAIL, adoptId],
        queryFn: () => getAdoptDetails(adoptId),
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
                                        Tên thú cưng
                                    </dt>
                                    <dd className="text-gray-700 sm:col-span-2">
                                        {data?.data?.name}
                                    </dd>
                                </div>

                                {/* Giá sản phẩm */}
                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">
                                        Loại thú cưng
                                    </dt>
                                    <dd className="text-gray-700 sm:col-span-2">
                                        {parseInt(
                                            data?.data?.type
                                        ).toLocaleString('vi-VN')}{' '}
                                        VND
                                    </dd>
                                </div>

                                {/* Mô tả sản phẩm */}
                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">
                                        Giới tính
                                    </dt>
                                    <dd className="text-gray-700 sm:col-span-2">
                                        {data?.data?.gender}
                                    </dd>
                                </div>

                                {/* Đối tượng người dùng */}
                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">
                                        Tuổi
                                    </dt>
                                    <dd className="text-gray-700 sm:col-span-2">
                                        {data?.data?.age}
                                    </dd>
                                </div>

                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">
                                        Tiền sử bệnh
                                    </dt>
                                    <dd className="text-gray-700 sm:col-span-2">
                                        {data?.data?.historyOfIssue}
                                    </dd>
                                </div>

                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">
                                        Bệnh hiện tại
                                    </dt>
                                    <dd className="text-gray-700 sm:col-span-2">
                                        {data?.data?.currentIssue}
                                    </dd>
                                </div>

                                {/* Hạn sử dụng */}
                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">
                                        Trạng thái
                                    </dt>
                                    <dd className="text-gray-700 sm:col-span-2">
                                        {data?.data?.status}
                                    </dd>
                                </div>

                                {/* Cân nặng */}
                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">
                                        Địa chỉ
                                    </dt>
                                    <dd className="text-gray-700 sm:col-span-2">
                                        {data?.data?.address}
                                    </dd>
                                </div>

                                {/* Thành phần */}
                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">
                                        Số điện thoại
                                    </dt>
                                    <dd className="text-gray-700 sm:col-span-2">
                                        {data?.data?.phone}
                                    </dd>
                                </div>

                                {/* Nguồn gốc */}
                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">
                                        Mô tả
                                    </dt>
                                    <dd className="text-gray-700 sm:col-span-2">
                                        {data?.data?.description}
                                    </dd>
                                </div>
                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">
                                        Ngày đăng
                                    </dt>
                                    <dd className="text-gray-700 sm:col-span-2">
                                        {formatDate(data?.data?.createDate)}
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

export default AdoptDetail;

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
