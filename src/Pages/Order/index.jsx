import React, { useMemo, useState } from 'react';
import Popover from '~/Components/Popover';
import Table from '~/Components/Table';
import { QUERY_KEYS, ROUTES } from '~/Constants';
import { IoIosMore } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useCustomSearchParams, useQueryDefault } from '~/Hooks';
import { getOrders } from '~/services';
import { formatPrice } from '~/lib/utils';
import clsx from 'clsx';
import FilterOrder from './Components/FilterOrder';

function Order() {
    const { setSearchPrams, page, limit, search, status, rangeDate } =
        useCustomSearchParams([
            'page',
            'limit',
            'search',
            'status',
            'rangeDate',
        ]);

    console.log('rangeDate', rangeDate);
    console.log('status', status);

    const { data, isLoading, isFetching } = useQueryDefault({
        keys: [QUERY_KEYS.ORDER, { page, limit, search, status, rangeDate }],
        fn: () =>
            getOrders({
                page: page || 1,
                limit: limit || 10,
                search: search || '',
                status: status || '',
                rangeDate: rangeDate || '',
            }),
        options: {
            slateTime: 1000,
            refetchOnFocus: true,
        },
    });

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
                key: 'user',
                title: 'Tên khách hàng',
                render: (_, user) => user?.fullname || 'N/A',
            },
            {
                key: 'address',
                title: 'Địa chỉ',
                render: (_, address) =>
                    convertAddress(address, ['address']) || 'N/A',
            },
            {
                key: 'payment',
                title: 'Thanh toán',
            },
            {
                key: 'items',
                title: 'Số lượng',
                render: (_, items) => items?.length,
            },
            {
                key: 'totalPrice',
                title: 'Giá',
                render: (_, price) => (
                    <span className="font-medium">{formatPrice(price)}</span>
                ),
            },
            {
                key: 'deliveryStatus',
                title: 'Trạng thái',
                render: (_, status) => (
                    <span
                        className={clsx(
                            'px-2 py-1 rounded-full',
                            status === 'pending' &&
                                'bg-yellow-100 text-yellow-800',
                            status === 'shipping' &&
                                'bg-blue-100 text-blue-800',
                            status === 'delivered' &&
                                'bg-green-100 text-green-800',
                            status === 'failed' && 'bg-red-100 text-red-800'
                        )}
                    >
                        {status === 'pending' && 'Chờ xác nhận'}
                        {status === 'shipping' && 'Đang giao'}
                        {status === 'delivered' && 'Đã giao'}
                        {status === 'failed' && 'Thất bại'}
                    </span>
                ),
            },
            {
                key: 'action',
                title: 'Action',
                align: 'center',
                render: (product) => (
                    <div className="w-full flex justify-center">
                        <Popover
                            dir="bottom"
                            align="center"
                            trigger={<IoIosMore size={20} />}
                            content={
                                <div className="flex flex-col bg-white dark:bg-navy-700 shadow-md">
                                    <Link
                                        to={ROUTES.ORDER_DETAIL.replace(
                                            ':orderId',
                                            product._id
                                        )}
                                        className="block whitespace-nowrap py-1 px-2 w-full text-left hover:bg-gray-100 dark:hover:bg-navy-600  duration-200"
                                    >
                                        Chi tiết
                                    </Link>
                                </div>
                            }
                        />
                    </div>
                ),
            },
        ],
        []
    );

    return (
        <div className="mt-4">
            <div>
                <FilterOrder defaultValues={{ status, rangeDate }} />
            </div>
            <Table
                data={data?.data || []}
                columns={columns}
                loading={isLoading}
                fetching={isFetching}
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

export default Order;

const convertAddress = (address, show = ['name', 'phone', 'address']) => {
    let json = {
        name: '',
        phone: '',
        address: '',
    };
    try {
        json = JSON.parse(address);
    } catch (error) {
        console.log(error);
        json.address = address;
    }

    return show.map((key) => json?.[key] || 'N/A').join(' | ');
};
