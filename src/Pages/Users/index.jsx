import { useCallback, useMemo } from 'react';
import { IoIosMore } from 'react-icons/io';
import { Link } from 'react-router-dom';

import Popover from '~/Components/Popover';
import Table from '~/Components/Table';
import { QUERY_KEYS, ROUTES, STATUS_USER } from '~/Constants';
import {
    useCustomSearchParams,
    useMutationAndToast,
    useQueryDefault,
} from '~/Hooks';
import { getUsers, updateStatusUser } from '~/services';
import FilterUsers from './Components/FilterUsers';
import { Button } from 'antd';

function UsersPage() {
    const { setSearchPrams, page, limit, search, status } =
        useCustomSearchParams(['page', 'limit', 'search', 'status']);
    const { data, isLoading, isFetching } = useQueryDefault({
        keys: [QUERY_KEYS.USERS, { page, limit, search, status }],
        fn: () =>
            getUsers({
                page: page || 1,
                limit: limit || 10,
                search: search || '',
                status: status || '',
            }),
        options: {
            slateTime: 1000,
            refetchOnFocus: true,
        },
    });
    const updateStatusMutation = useMutationAndToast({
        fn: updateStatusUser,
        keys: [QUERY_KEYS.USERS, { page, limit, search, status }],
        loadingString: 'Updating status...',
        successString: 'User update status successfully',
    });

    const handleUpdateStatusUser = useCallback(
        (id, status) => {
            updateStatusMutation.mutate({ id, status });
        },
        [updateStatusMutation]
    );

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
                key: 'fullname',
                title: 'Tên khách hàng',
                render: ({ fullname, _id }) => {
                    return (
                        <Link
                            to={ROUTES.PRODUCT_DETAIL.replace(
                                ':productId',
                                _id
                            )}
                        >
                            {fullname}
                        </Link>
                    );
                },
            },
            {
                key: 'username',
                title: 'username',
                render: ({ username }) => {
                    return username;
                },
            },
            {
                key: 'birthday',
                title: 'Ngày sinh',
                render: ({ birthday }) => {
                    return new Date(birthday).toLocaleDateString();
                },
            },
            {
                key: 'email',
                title: 'Email',
                render: ({ email }) => {
                    return email;
                },
            },
            {
                key: 'status',
                title: 'Trạng thái',
                render: ({ status }) => {
                    return status === STATUS_USER.ACTIVE
                        ? 'Hoạt động'
                        : 'Bị chặn';
                },
            },
            {
                key: 'action',
                title: 'Hành động',
                align: 'center',
                render: (user) => {
                    return (
                        <div className="w-full flex justify-center">
                            <Popover
                                dir="bottom"
                                align="center"
                                trigger={<IoIosMore size={20} />}
                                content={
                                    <div className="flex flex-col bg-white dark:bg-navy-700 shadow-md">
                                        {user?.status === STATUS_USER.ACTIVE ? (
                                            <Button
                                                onClick={() =>
                                                    handleUpdateStatusUser(
                                                        user._id,
                                                        STATUS_USER.BLOCKED
                                                    )
                                                }
                                            >
                                                Chặn người dùng
                                            </Button>
                                        ) : (
                                            <Button
                                                onClick={() =>
                                                    handleUpdateStatusUser(
                                                        user._id,
                                                        STATUS_USER.ACTIVE
                                                    )
                                                }
                                            >
                                                Bỏ chặn
                                            </Button>
                                        )}
                                    </div>
                                }
                            />
                        </div>
                    );
                },
            },
        ],
        [handleUpdateStatusUser]
    );

    return (
        <div>
            <div className="mt-8 mb-4">
                <FilterUsers
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

export default UsersPage;
