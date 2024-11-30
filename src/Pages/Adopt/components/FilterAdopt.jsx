import Filter from '~/Components/Filter';

import { TYPE_FIELD_FILTER } from '~/Constants';

function FilterAdopt({ children, defaultValues }) {
    const fields = [
        {
            type: TYPE_FIELD_FILTER.TEXT,
            name: 'search',
            placeholder: 'Tên thú cưng',
            isPriority: true,
            defaultValue: defaultValues?.search,
        },
        {
            type: TYPE_FIELD_FILTER.SELECT,
            name: 'status',
            placeholder: 'Trạng thái',
            defaultValue: defaultValues?.status,
            // TODO: Thêm options status vô đây
            options: ['Còn hàng', 'Sắp hết hàng', 'Hết hàng'].map((item) => ({
                value: item,
                label: item,
            })),
        },
    ];

    return <Filter items={fields}>{children}</Filter>;
}

export default FilterAdopt;
