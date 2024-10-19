import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import AddProductForm from '~/Components/Product/AddProductForm';
import { useMutationAndToast } from '~/Hooks';
import { QUERY_KEYS } from '~/Constants';
import { createProduct } from '~/services';

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
            <div className="flex gap-4 items-center">
                <Link
                    to={-1}
                    className="flex items-center gap-1 border hover:bg-gray-200 duration-200 px-2 pr-3 py-1 rounded-md"
                >
                    <IoIosArrowBack size={16} />
                    Back
                </Link>
                <h1 className="font-bold text-xl">Add Product</h1>
            </div>

            <div className="mt-6">
                <AddProductForm onSubmit={handleCreateProduct} />
            </div>
        </main>
    );
}

export default AddProductPage;
