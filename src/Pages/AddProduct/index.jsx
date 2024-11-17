import ProductForm from '~/Components/Product/ProductForm';
import { useMutationAndToast } from '~/Hooks';
import { QUERY_KEYS, ROUTES } from '~/Constants';
import { createProduct } from '~/services';
import HeaderPage from '~/Components/HeaderPage';
import { useNavigate } from 'react-router-dom';

function AddProductPage() {
    const navigate = useNavigate();
    const mutation = useMutationAndToast({
        keys: [QUERY_KEYS.PRODUCTS],
        fn: createProduct,
        loadingString: 'Adding product...',
        successString: 'Adding product success',
        onSuccess: () => {
            navigate(ROUTES.PRODUCTS);
        },
    });

    const handleCreateProduct = (values) => {
        mutation.mutate(values);
    };

    return (
        <main>
            <HeaderPage />

            <div className="mt-6">
                <ProductForm onSubmit={handleCreateProduct} />
            </div>
        </main>
    );
}

export default AddProductPage;
