import { useState } from 'react';
import Popover from '~/Components/Popover';
import Table from '~/Components/Table';
import { PRODUCTS_DATA, QUERY_KEYS, ROUTES } from '~/Constants';
import { IoIosMore, IoIosAddCircleOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';
import Modal from '~/Components/Modal';
import { useCustomSearchParams, useQueryDefault } from '~/Hooks';
import { getAllProducts } from '~/services';

function Product() {
    const [products, setProducts] = useState(PRODUCTS_DATA);
    const { setSearchPrams, page, limit, search } = useCustomSearchParams([
        'page',
        'limit',
        'search',
    ]);
    const { data, isLoading, isFetching } = useQueryDefault({
        keys: [QUERY_KEYS.PRODUCTS, { page, limit, search }],
        fn: getAllProducts,
        page: page || 1,
        limit: limit || 10,
        search: search || '',
    });
    const [showModalDelete, setShowModalDelete] = useState({
        show: false,
        product: null,
    });

    const handleEditProduct = (id) => {
        console.log('Edit product', id);
    };

    const handleShowModalDelete = (product) => {
        setShowModalDelete({
            show: true,
            product,
        });
    };

    const handleDeleteProduct = (id) => {
        setProducts(products.filter((product) => product.id !== id));
        setShowModalDelete({ show: false, product: null });
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

    const columns = [
        {
            key: 'id',
            title: 'Code',
        },
        {
            key: 'name',
            title: 'Product',
        },
        {
            key: 'type',
            title: 'Type',
        },
        {
            key: 'price',
            title: 'Price',
            render: ({ price }) => {
                return price;
            },
        },
        {
            key: 'quantity',
            title: 'Quantity',
        },
        {
            key: 'status',
            title: 'Status',
            render: ({ status }) => {
                return status ? 'Not hide' : 'Hidden';
            },
        },
        {
            key: 'promotion',
            title: 'Promotion',
            render: ({ promotion }) => {
                return <span className="font-medium">{promotion}</span>;
            },
        },
        {
            key: 'action',
            title: 'Action',
            align: 'center',
            render: (product) => {
                return (
                    <div className="w-full flex justify-center">
                        <Popover
                            dir="bottom"
                            align="center"
                            trigger={<IoIosMore size={20} />}
                            content={
                                <div className="flex flex-col bg-white shadow-md">
                                    <button
                                        className="py-1 px-2 w-full text-left hover:bg-gray-100 duration-200"
                                        onClick={() =>
                                            handleEditProduct(product.id)
                                        }
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="py-1 px-2 w-full text-left hover:bg-gray-100 duration-200"
                                        onClick={() =>
                                            handleShowModalDelete(product)
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
    ];

    return (
        <div>
            <div className="flex justify-between my-8 items-center">
                <h2>Product</h2>
                <Link
                    to={ROUTES.ADD_PRODUCT}
                    className="rounded-md px-4 py-2 bg-blue-500 text-white flex gap-2 items-center"
                >
                    <IoIosAddCircleOutline size={20} />
                    Add
                </Link>
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

            <Modal
                variant="danger"
                open={showModalDelete.show}
                onClose={() =>
                    setShowModalDelete({ show: false, product: null })
                }
                footer={
                    <div className="flex justify-end">
                        <button
                            className="bg-red-500 text-white px-4 py-1 rounded-md"
                            onClick={() =>
                                handleDeleteProduct(showModalDelete.product.id)
                            }
                        >
                            Delete
                        </button>
                        <button
                            className="px-4 py-1 rounded-md ml-2 border-2 border-gray-200"
                            onClick={() =>
                                setShowModalDelete({
                                    show: false,
                                    product: null,
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
                    <strong>{showModalDelete.product?.name}</strong>?
                </p>
            </Modal>
        </div>
    );
}

export default Product;
