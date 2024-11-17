import ProductForm from '~/Components/Product/ProductForm';
import { configQuery, useMutationAndToast } from '~/Hooks';
import { QUERY_KEYS, ROUTES } from '~/Constants';
import { getProductById, updateProduct } from '~/services';
import HeaderPage from '~/Components/HeaderPage';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '~/Components/common';
import moment from 'moment';

function UpdateProductPage() {
    const navigate = useNavigate();
    const { productId } = useParams();
    const { data, isLoading } = useQuery({
        queryKey: ['product', productId],
        queryFn: () => getProductById(productId),
        ...configQuery,
        staleTime: 1000,
    });

    const mutation = useMutationAndToast({
        keys: [QUERY_KEYS.PRODUCTS],
        fn: updateProduct,
        loadingString: 'Updating product...',
        successString: 'Updating product success',
        onSuccess: () => {
            navigate(ROUTES.PRODUCTS);
        },
    });

    const handleUpdateProduct = (values) => {
        console.log('values', values.get('name'));
        mutation.mutate({
            data: values,
            id: productId,
        });
    };

    return (
        <main>
            <HeaderPage />

            <div className="mt-6">
                {isLoading && <LoadingProductDetail />}
                {data && (
                    <ProductForm
                        onSubmit={handleUpdateProduct}
                        initialValues={{
                            ...data.data,
                            dateOfManufacture: moment(
                                data.data.dateOfManufacture
                            ).format('YYYY-MM-DD'),
                            expirationDate: moment(
                                data.data.expirationDate
                            ).format('YYYY-MM-DD'),
                        }}
                    />
                )}
            </div>
        </main>
    );
}

export default UpdateProductPage;

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
