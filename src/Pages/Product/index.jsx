import { useState } from 'react';
import { IoIosMore, IoIosAddCircleOutline } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import Modal from '~/Components/Modal';
import Popover from '~/Components/Popover';
import Table from '~/Components/Table';
import { QUERY_KEYS, ROUTES } from '~/Constants';
import {
    useCustomSearchParams,
    useMutationAndToast,
    useQueryDefault,
} from '~/Hooks';
import { deleteProduct, getAllProducts } from '~/services';
import { detectNearExpiredProducts, formatDate } from '~/lib/utils';
import { ProductImage } from '~/Components/common';
import FilterProduct from './Components/FilterProduct';

function Product() {
    const [showModalDelete, setShowModalDelete] = useState({
        show: false,
        product: null,
    });
    const { setSearchPrams, page, limit, search, status, type, price } =
        useCustomSearchParams([
            'page',
            'limit',
            'search',
            'status',
            'type',
            'price',
        ]);
    const nav = useNavigate();
    const { data, isLoading, isFetching } = useQueryDefault({
        keys: [
            QUERY_KEYS.PRODUCTS,
            { page, limit, search, status, type, price },
        ],
        fn: () =>
            getAllProducts({
                page: page || 1,
                limit: limit || 10,
                search: search || '',
                status: status || '',
                type: type || '',
                price: price || '',
                populate: 'type',
            }),
    });
    const deleteMutation = useMutationAndToast({
        fn: deleteProduct,
        keys: [QUERY_KEYS.PRODUCTS, { page, limit, search }],
        onSuccess: () => {
            setShowModalDelete({ show: false, product: null });
        },
        loadingString: 'Deleting product...',
        successString: 'Product deleted successfully',
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
        deleteMutation.mutate(id);
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
            key: 'images',
            render: ({ images }) => {
                const image = images?.[0] || null;
                return (
                    <ProductImage
                        src={image}
                        className="object-cover size-32"
                    />
                );
            },
        },
        {
            key: 'name',
            title: 'Tên sản phẩm',
            render: ({ name, _id }) => {
                return (
                    <Link to={ROUTES.PRODUCT_DETAIL.replace(':productId', _id)}>
                        {name}
                    </Link>
                );
            },
        },
        {
            key: 'type',
            title: 'Loại',
            render: ({ type }) => {
                return type?.name;
            },
        },
        {
            key: 'price',
            title: 'Giá',
            render: ({ price }) => {
                return price;
            },
        },
        {
            key: 'quantity',
            title: 'SL',
        },
        {
            key: 'expirationDate',
            title: 'Hạn sử dụng',
            render: ({ expirationDate }) => {
                const detect = detectNearExpiredProducts(expirationDate, 30);
                return (
                    <span
                        className={clsx({
                            'font-medium': true,
                            'bg-yellow-500 text-white px-2 rounded-md':
                                detect.nearExpired,
                            'bg-red-500 text-white px-2 rounded-md':
                                detect.hadExpired,
                        })}
                    >
                        {formatDate(expirationDate)}
                    </span>
                );
            },
        },
        {
            key: 'action',
            title: 'Hành động',
            align: 'center',
            render: (product) => {
                return (
                    <div className="w-full flex justify-center">
                        <Popover
                            dir="bottom"
                            align="center"
                            trigger={<IoIosMore size={20} />}
                            content={
                                <div className="flex flex-col bg-white dark:bg-navy-700 shadow-md">
                                    <button
                                        className="py-1 px-2 w-full text-left hover:bg-gray-100 dark:hover:bg-navy-600 duration-200"
                                        onClick={() =>
                                            nav(
                                                ROUTES.UPDATE_PRODUCT.replace(
                                                    ':productId',
                                                    product._id
                                                )
                                            )
                                        }
                                    >
                                        Sửa
                                    </button>
                                    <button
                                        className="py-1 px-2 w-full text-left hover:bg-gray-100 dark:hover:bg-navy-600 duration-200"
                                        onClick={() =>
                                            handleShowModalDelete(product)
                                        }
                                    >
                                        Xóa
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
            <div className="mt-8 mb-4">
                <FilterProduct
                    defaultValues={{
                        search,
                        status,
                        type,
                        price: price?.split('-').map((item) => +item),
                    }}
                >
                    <Link
                        to={ROUTES.ADD_PRODUCT}
                        className="rounded-md px-4 py-2 bg-blue-500 text-white flex gap-2 items-center"
                    >
                        <IoIosAddCircleOutline size={20} />
                        Thêm sản phẩm
                    </Link>
                </FilterProduct>
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
                                handleDeleteProduct(showModalDelete.product._id)
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
