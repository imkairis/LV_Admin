import Filter from '~/Components/Filter';

import { TYPE_FIELD_FILTER } from '~/Constants';

function FilterUsers({ children, defaultValues }) {
    const fields = [
        {
            type: TYPE_FIELD_FILTER.TEXT,
            name: 'search',
            placeholder: 'Tên người dùng',
            isPriority: true,
            defaultValue: defaultValues?.search,
        },
        {
            type: TYPE_FIELD_FILTER.SELECT,
            name: 'status',
            placeholder: 'Trạng thái',
            defaultValue: defaultValues?.status,
            options: [
                {
                    value: '1',
                    label: 'Hoạt động',
                },
                {
                    value: '2',
                    label: 'Đã chặn',
                },
            ],
        },
    ];

    return <Filter items={fields}>{children}</Filter>;
}

export default FilterUsers;
