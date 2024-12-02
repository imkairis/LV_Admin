import Filter from '~/Components/Filter';

import { TYPE_FIELD_FILTER } from '~/Constants';

function FilterOrder({ children, defaultValues }) {
    console.log(defaultValues?.rangeDate);
    const fields = [
        {
            type: TYPE_FIELD_FILTER.SELECT,
            name: 'status',
            placeholder: 'Trạng thái',
            defaultValue: defaultValues?.status,
            // TODO: Thêm options status vô đây
            options: [
                { value: 'pending', label: 'Chờ xác nhận' },
                { value: 'shipping', label: 'Đang giao' },
                { value: 'delivered', label: 'Đã giao' },
                { value: 'failed', label: 'Thất bại' },
            ],
        },
        {
            type: TYPE_FIELD_FILTER.RANGE_DATE_PICKER,
            name: 'rangeDate',
            placeholder: ['Từ ngày', 'Đến ngày / Hiện tại'],
            defaultValue: defaultValues?.rangeDate || [],
            isPriority: true,
        },
    ];

    return <Filter items={fields}>{children}</Filter>;
}

export default FilterOrder;
