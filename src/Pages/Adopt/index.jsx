import Popover from '~/Components/Popover';
import Table from '~/Components/Table';
import { QUERY_KEYS, ROUTES, STATUS_ADOPT } from '~/Constants';
import { IoIosMore, IoIosAddCircleOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';

import {
    useCustomSearchParams,
    useMutationAndToast,
    useQueryDefault,
} from '~/Hooks';
import { getAllAdopts, updateStatusAdopt } from '~/services';
import { ProductImage } from '~/Components/common';

function AdoptPage() {
    const { setSearchPrams, page, limit, search } = useCustomSearchParams([
        'page',
        'limit',
        'search',
    ]);
    const { data, isLoading, isFetching } = useQueryDefault({
        keys: [QUERY_KEYS.ADOPT, { page, limit, search }],
        fn: () =>
            getAllAdopts({
                page: page || 1,
                limit: limit || 10,
                search: search || '',
                descending: true,
            }),
    });
    const updateStatusAdoptMutation = useMutationAndToast({
        fn: updateStatusAdopt,
        keys: [QUERY_KEYS.ADOPT, { page, limit, search }],
        loadingString: 'Deleting adopt...',
        successString: 'Adopt deleted successfully',
        failString: 'Delete adopt failed',
    });

    const handleUpdateStatusAdopt = (id, status) => {
        updateStatusAdoptMutation.mutate({ id, status });
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
            title: 'Product',
            render: ({ name, _id }) => {
                return (
                    <Link to={ROUTES.ADOPT_DETAIL.replace(':adoptId', _id)}>
                        {name}
                    </Link>
                );
            },
        },
        {
            key: 'status',
            title: 'Trạng thái',
        },
        {
            key: 'user',
            title: 'Người đăng',
            render: ({ user }) => {
                return user.fullname;
            },
        },
        {
            key: 'action',
            title: 'Action',
            align: 'center',
            render: (adopt) => {
                if (adopt.status !== STATUS_ADOPT.PENDING) {
                    return null;
                }

                return (
                    <div className="w-full flex justify-center">
                        <Popover
                            dir="bottom"
                            align="center"
                            trigger={<IoIosMore size={20} />}
                            content={
                                <div className="flex flex-col bg-white dark:bg-navy-700 shadow-md w-32">
                                    <button
                                        className="py-1 px-2 w-full text-left hover:bg-gray-100 dark:hover:bg-navy-600 duration-200"
                                        onClick={() =>
                                            handleUpdateStatusAdopt(
                                                adopt._id,
                                                STATUS_ADOPT.WAITING
                                            )
                                        }
                                    >
                                        Duyệt
                                    </button>
                                    <button
                                        className="py-1 px-2 w-full text-left hover:bg-gray-100 dark:hover:bg-navy-600 duration-200"
                                        onClick={() =>
                                            handleUpdateStatusAdopt(
                                                adopt._id,
                                                STATUS_ADOPT.REJECTED
                                            )
                                        }
                                    >
                                        Từ chối
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
                <h2>Adopt</h2>
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
        </div>
    );
}

export default AdoptPage;
