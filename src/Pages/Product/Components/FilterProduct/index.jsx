import Filter from '~/Components/Filter';

import { TYPE_FIELD_FILTER } from '~/Constants';

function FilterProduct({ children, defaultValues }) {
    const fields = [
        {
            type: TYPE_FIELD_FILTER.TEXT,
            name: 'search',
            placeholder: 'Tên sản phẩm',
            isPriority: true,
            defaultValue: defaultValues?.search,
        },
        {
            type: TYPE_FIELD_FILTER.SELECT,
            name: 'type',
            placeholder: 'Loại',
            defaultValue: defaultValues?.type,
            options: [
                {
                    value: '6723b336a8cc66e7c07a8302',
                    label: 'Đồ chơi',
                },
                {
                    value: '67238a8842d93be1ed5743a1',
                    label: 'Thức ăn',
                },
                {
                    value: '6723b36da8cc66e7c07a830c',
                    label: 'Thuốc',
                },
                {
                    value: '6723b355a8cc66e7c07a8307',
                    label: 'Chuồng',
                },
            ],
        },
        {
            type: TYPE_FIELD_FILTER.SELECT,
            name: 'status',
            placeholder: 'Trạng thái',
            defaultValue: defaultValues?.status,
            options: ['Còn hàng', 'Sắp hết hàng', 'Hết hàng'].map((item) => ({
                value: item,
                label: item,
            })),
        },
        {
            type: TYPE_FIELD_FILTER.SLIDER,
            name: 'price',
            placeholder: 'Giá',
            defaultValue: defaultValues?.price,
            step: 10000,
        },
    ];

    return <Filter items={fields}>{children}</Filter>;
}

export default FilterProduct;
