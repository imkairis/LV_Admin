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
        <main>
            <HeaderPage title="Product Detail" />
            {isLoading && <LoadingProductDetail />}
            {!isLoading && data && (
                <div>
                    <div className="w-3/4 mx-auto">
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
                                />
                            )}
                        />
                    </div>

                    <h2>Name: {data?.data?.name}</h2>
                    <p>Price: {data?.data?.price}</p>
                    <p>Type: {data?.data?.type}</p>
                    <p>Quantity: {data?.data?.quantity}</p>
                    <p>Cost: {data?.data?.cost}</p>
                    <p>Stock quantity: {data?.data?.stockQuantity}</p>
                    <p>Description: {data?.data?.description}</p>
                    <p>User manual: {data?.data?.userManual}</p>
                    <p>Weight: {data?.data?.weight}</p>
                    <p>Element: {data?.data?.element}</p>
                    <p>Origin: {data?.data?.origin}</p>
                    <p>
                        Date of manufacture:{' '}
                        {formatDate(data?.data?.dateOfManufacture)}
                    </p>
                    <p>
                        Expiration date:{' '}
                        {formatDate(data?.data?.expirationDate)}
                    </p>
                    <p>Target audience: {data?.data?.targetAudience}</p>
                    <p>Age group: {data?.data?.ageGroup}</p>
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
