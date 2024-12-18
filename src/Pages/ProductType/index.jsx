import { useMemo, useState } from 'react';
import Popover from '~/Components/Popover';
import Table from '~/Components/Table';
import { IoIosMore, IoIosAddCircleOutline } from 'react-icons/io';
import Modal from '~/Components/Modal';
import ProductTypeForm from '~/Components/Product/ProductTypeForm';
import {
    useCustomSearchParams,
    useMutationAndToast,
    useQueryDefault,
} from '~/Hooks';
import {
    addProductType,
    getAllProductTypes,
    deleteProductType,
    updateProductType,
} from '~/services';
import { QUERY_KEYS } from '~/Constants';

function ProductType() {
    // status modal
    const [showModalDelete, setShowModalDelete] = useState({
        show: false,
        target: null,
    });
    const [showModalEdit, setShowModalEdit] = useState({
        show: false,
        target: null,
    });
    const [showModalAdding, setShowModalAdding] = useState(false);

    // Queries
    const { setSearchPrams, page, limit } = useCustomSearchParams([
        'page',
        'limit',
    ]);
    const { data, isLoading, isFetching } = useQueryDefault({
        keys: [QUERY_KEYS.PRODUCT_TYPES, { page, limit }],
        fn: () =>
            getAllProductTypes({
                page: page || 1,
                limit: limit || 10,
            }),
    });
    const mutation = useMutationAndToast({
        keys: [QUERY_KEYS.PRODUCT_TYPES, { page, limit }],
        fn: addProductType,
        onSuccess: () => setShowModalAdding(false),
        loadingString: 'Adding product type...',
        successString: 'Adding product type success',
    });
    const mutationDelete = useMutationAndToast({
        keys: [QUERY_KEYS.PRODUCT_TYPES, { page, limit }],
        fn: deleteProductType,
        onSuccess: () => setShowModalDelete({ show: false, type: null }),
        loadingString: 'Deleting product type...',
        successString: 'Deleting product type success',
    });
    const mutationEdit = useMutationAndToast({
        keys: [QUERY_KEYS.PRODUCT_TYPES, { page, limit }],
        fn: updateProductType,
        onSuccess: () => setShowModalEdit({ show: false, type: null }),
        loadingString: 'Updating product type...',
        successString: 'Updating product type success',
    });

    const handleDeleteProductType = (id) => {
        console.log('Delete product', id);
        mutationDelete.mutate(id);
    };

    const handleSubmit = (values) => {
        console.log('values', values);
        if (showModalEdit.show) {
            mutationEdit.mutate(values);
        } else {
            mutation.mutate(values);
        }
    };

    const handleCloseModalProductType = () => {
        if (showModalAdding) setShowModalAdding(false);
        if (showModalEdit.show) {
            setShowModalEdit({ show: false, target: null });
        }
    };

    const handlePageChange = (page) => {
        setSearchPrams((params) => {
            params.set('page', page);
            return params;
        });
    };

    const handleLimitChange = (limit) => {
        setSearchPrams((params) => {
            params.set('limit', limit);
            return params;
        });
    };

    const columns = useMemo(
        () => [
            {
                key: '_id',
                title: 'Code',
            },
            {
                key: 'name',
                title: 'Name',
            },
            {
                key: 'description',
                title: 'Description',
            },
            {
                key: 'action',
                title: 'Action',
                align: 'center',
                render: (values) => {
                    return (
                        <div className="w-full flex justify-center">
                            <Popover
                                dir="bottom"
                                align="center"
                                trigger={<IoIosMore size={20} />}
                                content={
                                    <div className="flex flex-col bg-white dark:bg-navy-600 shadow-md">
                                        <button
                                            className="py-1 px-2 w-full text-left hover:bg-gray-100 dark:hover:bg-navy-500 duration-200"
                                            onClick={() =>
                                                setShowModalEdit({
                                                    show: true,
                                                    target: values,
                                                })
                                            }
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="py-1 px-2 w-full text-left hover:bg-gray-100 dark:hover:bg-navy-500 duration-200"
                                            onClick={() =>
                                                setShowModalDelete({
                                                    show: true,
                                                    target: values,
                                                })
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                }
                            />
                        </div>
                    );
                },
            },
        ],
        []
    );

    return (
        <main>
            <div className="flex justify-between my-8 items-center">
                <h2>Product Types</h2>
                <button
                    className="rounded-md px-4 py-2 bg-blue-500 text-white flex gap-2 items-center"
                    onClick={() => setShowModalAdding(true)}
                >
                    <IoIosAddCircleOutline size={20} />
                    Add
                </button>
            </div>

            <Table
                data={data?.data || []}
                columns={columns}
                loading={isLoading || isFetching}
                currentPage={data?.pagination?.page || 1}
                limit={data?.pagination?.limit || 10}
                totalPages={data?.pagination?.totalPage || 1}
                enableLimitChange
                onLimitChange={handleLimitChange}
                showOrder
                pagination
                onPageChange={handlePageChange}
            />

            {/* Modal */}
            <ModalConfirmDelete
                onDeleteProductType={(id) => handleDeleteProductType(id)}
                setShowModalDelete={setShowModalDelete}
                showModalDelete={showModalDelete}
            />

            <ModalProductType
                open={showModalAdding || showModalEdit.show}
                onClose={handleCloseModalProductType}
                onSubmit={handleSubmit}
                initialValues={showModalEdit.target}
            />
        </main>
    );
}

export default ProductType;

const ModalConfirmDelete = ({
    showModalDelete,
    setShowModalDelete,
    onDeleteProductType,
}) => {
    return (
        <Modal
            title="Delete Product Type"
            open={showModalDelete.show}
            onClose={() => setShowModalDelete({ show: false, target: null })}
            footer={
                <div className="flex justify-end">
                    <button
                        className="bg-red-500 text-white px-4 py-1 rounded-md"
                        onClick={() =>
                            onDeleteProductType(showModalDelete.target._id)
                        }
                    >
                        Delete
                    </button>
                    <button
                        className="px-4 py-1 rounded-md ml-2 border-2 border-gray-200"
                        onClick={() =>
                            setShowModalDelete({
                                show: false,
                                target: null,
                            })
                        }
                    >
                        Cancel
                    </button>
                </div>
            }
        >
            <p>
                Are you sure you want to delete{' '}
                <strong>{showModalDelete.target?.name}</strong>?
            </p>
        </Modal>
    );
};

const ModalProductType = ({ onClose, open, onSubmit, initialValues }) => {
    const handleSubmit = (values) => {
        onSubmit(values);
    };

    return (
        <Modal title="Add Product Type" open={open} onClose={onClose}>
            <ProductTypeForm
                onSubmit={(values) => handleSubmit(values)}
                initialValues={initialValues}
            />
        </Modal>
    );
};
