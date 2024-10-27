import AddProductForm from '~/Components/Product/AddProductForm';
import { useMutationAndToast } from '~/Hooks';
import { QUERY_KEYS } from '~/Constants';
import { createProduct } from '~/services';
import HeaderPage from '~/Components/HeaderPage';

function AddProductPage() {
    const mutation = useMutationAndToast({
        keys: [QUERY_KEYS.PRODUCTS],
        fn: createProduct,
        loadingString: 'Adding product...',
        successString: 'Adding product success',
    });

    const handleCreateProduct = (values) => {
        mutation.mutate(values);
    };

    return (
        <main>
            <HeaderPage />

            <div className="mt-6">
                <AddProductForm onSubmit={handleCreateProduct} />
            </div>
        </main>
    );
}

export default AddProductPage;
