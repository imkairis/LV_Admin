import Filter from '~/Components/Filter';

import { STATUS_ADOPT, TYPE_FIELD_FILTER } from '~/Constants';

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
            options: Object.values(STATUS_ADOPT).map((item) => ({
                value: item,
                label: item,
            })),
        },
    ];

    return <Filter items={fields}>{children}</Filter>;
}

export default FilterAdopt;
