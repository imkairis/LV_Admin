import React, { useState } from 'react';
import Popover from '~/Components/Popover';
import Table from '~/Components/Table';
// import { PRODUCTS_DATA } from '~/Constants';
import { IoIosMore } from 'react-icons/io';
import { useSearchParams } from 'react-router-dom';
import Modal from '~/Components/Modal';
import {useDispatch, useSelector} from "react-redux";
import {getProductsRequestStart} from "~/Redux/product/slice.jsx";

function Product() {
    // const [products, setProducts] = useState(PRODUCTS_DATA);
    const [loading, setLoading] = useState(false);
    const [searchPrams, setSearchPrams] = useSearchParams();
    const [showModalDelete, setShowModalDelete] = useState({
        show: false,
        product: null,
    });

    const dispatch = useDispatch();
    const [orderBy, setOrderBy,] = React.useState('');
    const [descending, setDescending,] = React.useState(true);
    const [page, setPage,] = React.useState(1);
    const [limit, setLimit,] = React.useState(10);
    const [selectedObj, setSelectedObj,] = React.useState(null);
    const { products, meta, updateSuccess, deleteSuccess, createSuccess, } = useSelector((state) => state.product);

    // Temporary
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    // const totalPages = Math.ceil(products.length / pageSize);

    const getProducts = () => {
        dispatch(
            getProductsRequestStart({
                orderBy,
                page,
                limit,
                descending,
            })
        );
    };

    React.useEffect(() => {
        getProducts();
    },[orderBy, descending, page, limit, dispatch, selectedObj, updateSuccess, deleteSuccess, createSuccess,]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

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
        console.log('Edit product', id);
        // setProducts(products.filter((product) => product.id !== id));
    };

    const handleLimitChange = (limit) => {
        setSearchPrams((prev) => ({
            ...prev,
            limit,
        }));
        console.log('Limit change', limit);
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
            <h2>Product</h2>

            <Table
                data={products}
                columns={columns}
                loading={loading}
                enableLimitChange
                onLimitChange={handleLimitChange}
                showOrder
                pagination
                currentPage={currentPage}
                limit={pageSize}
                // totalPages={totalPages}
                totalCount={products.length}
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
