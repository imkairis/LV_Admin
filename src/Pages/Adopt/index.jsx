import { IoIosMore } from 'react-icons/io';
import { Link } from 'react-router-dom';

import Popover from '~/Components/Popover';
import Table from '~/Components/Table';
import { QUERY_KEYS, ROUTES, STATUS_ADOPT } from '~/Constants';
import { formatDate } from '~/lib/utils';
import {
    useCustomSearchParams,
    useMutationAndToast,
    useQueryDefault,
} from '~/Hooks';
import { getAllAdopts, updateStatusAdopt } from '~/services';
import { ProductImage } from '~/Components/common';
import FilterAdopt from './components/FilterAdopt';

function AdoptPage() {
    const { setSearchPrams, page, limit, search, status } =
        useCustomSearchParams(['page', 'limit', 'search', 'status']);
    const { data, isLoading, isFetching } = useQueryDefault({
        keys: [QUERY_KEYS.ADOPT, { page, limit, search, status }],
        fn: () =>
            getAllAdopts({
                page: page || 1,
                limit: limit || 10,
                search: search || '',
                status: status || '',
                descending: true,
            }),
        options: {
            slateTime: 1000,
        }
    });
    const updateStatusAdoptMutation = useMutationAndToast({
        fn: updateStatusAdopt,
        keys: [QUERY_KEYS.ADOPT, { page, limit, search, status }],
        loadingString: 'Update adopt...',
        successString: 'Adopt update successfully',
        failString: 'Update adopt failed',
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
            title: 'Tên thú cưng',
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
            key: 'createDate',
            title: 'Ngày đăng',
            render: ({ createDate }) => {
                return formatDate(createDate);
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
            <div className="mt-8 mb-4">
                <FilterAdopt
                    defaultValues={{
                        search,
                        status,
                    }}
                />
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
