import {
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    Row,
    Select,
    Space,
    Slider,
} from 'antd';
import { useSearchParams } from 'react-router-dom';

import { TYPE_FIELD_FILTER } from '~/Constants';
import { formatPrice } from '~/lib/utils';

const { Option } = Select;

export default function Filter({ items, children }) {
    const [form] = Form.useForm();
    const [, setSearchPrams] = useSearchParams();

    const onFinish = (values) => {
        let params = {};
        for (let key in values) {
            if (values[key]) {
                if (Array.isArray(values[key])) {
                    if (values[key].length > 0) {
                        params = { ...params, [key]: values[key].join('-') };
                    }
                } else {
                    params = { ...params, [key]: values[key] };
                }
            }
        }
        setSearchPrams(params);
    };

    return (
        <Form form={form} name="advanced_search" onFinish={onFinish}>
            <Row gutter={24}>
                {items.map((item) => (
                    <Fields {...item} key={item.name} />
                ))}
            </Row>
            <div className="flex justify-between">
                <div>{children}</div>

                <Space size="small">
                    <Button type="primary" htmlType="submit">
                        Search
                    </Button>
                    <Button
                        onClick={() => {
                            form.resetFields();
                        }}
                    >
                        Clear
                    </Button>
                </Space>
            </div>
        </Form>
    );
}

const Fields = (props) => {
    return (
        <Col span={props?.isPriority ? 8 : 4}>
            <Form.Item name={props?.name} label={props?.label}>
                {props?.type === TYPE_FIELD_FILTER.TEXT && (
                    <Input placeholder={props?.placeholder} />
                )}
                {props?.type === TYPE_FIELD_FILTER.SELECT && (
                    <Select
                        placeholder={props?.placeholder}
                        allowClear={props?.allowClear || false}
                        mode={props?.mode || null}
                        defaultValue={props.defaultValue}
                    >
                        {props?.options.map((option) => (
                            <Option key={option.value} value={option.value}>
                                {option.label}
                            </Option>
                        ))}
                    </Select>
                )}
                {props?.type === TYPE_FIELD_FILTER.DATE && (
                    <DatePicker placeholder={props?.placeholder} />
                )}
                {props?.type === TYPE_FIELD_FILTER.RANGE_DATE_PICKER && (
                    <DatePicker.RangePicker
                        placeholder={props?.placeholder}
                        allowEmpty={[true, true]}
                        defaultValue={props?.defaultValue}
                    />
                )}
                {props?.type === TYPE_FIELD_FILTER.SLIDER && (
                    <Slider
                        range
                        min={0}
                        max={1000000}
                        defaultValue={props?.defaultValue}
                        step={props?.step}
                        tooltip={{
                            formatter: (value) => `${formatPrice(value)}`,
                        }}
                    />
                )}
            </Form.Item>
        </Col>
    );
};
