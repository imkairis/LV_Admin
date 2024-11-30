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
import dayjs from 'dayjs';
import { useSearchParams } from 'react-router-dom';

import { TYPE_FIELD_FILTER } from '~/Constants';
import { formatPrice } from '~/lib/utils';

const { Option } = Select;

const dateFormat = 'YYYY/MM/DD';

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
        <Form
            form={form}
            name="advanced_search"
            onFinish={onFinish}
            initialValues={{
                ...items.reduce((acc, item) => {
                    if (item.type === TYPE_FIELD_FILTER.RANGE_DATE_PICKER) {
                        // acc[item.name] = [
                        //     item.defaultValue[0]
                        //         ? dayjs(item.defaultValue[0])
                        //         : dayjs(),
                        //     item.defaultValue[1]
                        //         ? dayjs(item.defaultValue[1])
                        //         : dayjs(),
                        // ];
                        return acc;
                    }
                    acc[item.name] = item.defaultValue;
                    return acc;
                }, {}),
            }}
        >
            <Row gutter={24}>
                {items.map((item) => (
                    <Fields {...item} key={item.name} />
                ))}
                <Col flex="auto">
                    <div className="flex justify-between">
                        <div>{children}</div>
                        <Space size="small">
                            <Button type="primary" htmlType="submit">
                                Search
                            </Button>
                            <Button
                                onClick={() => {
                                    setSearchPrams({});
                                    setTimeout(() => {
                                        form.resetFields();
                                    }, 100);
                                }}
                            >
                                Clear
                            </Button>
                        </Space>
                    </div>
                </Col>
            </Row>
        </Form>
    );
}

const Fields = (props) => {
    return (
        <Col span={props?.isPriority ? 8 : 4}>
            <Form.Item name={props?.name} label={props?.label}>
                {props?.type === TYPE_FIELD_FILTER.TEXT && (
                    <Input
                        placeholder={props?.placeholder}
                        // defaultValue={props.defaultValue}
                    />
                )}
                {props?.type === TYPE_FIELD_FILTER.SELECT && (
                    <Select
                        placeholder={props?.placeholder}
                        allowClear={props?.allowClear || false}
                        mode={props?.mode || null}
                        // defaultValue={props.defaultValue}
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
                        format={dateFormat}
                        placeholder={props?.placeholder}
                        allowEmpty={[true, true]}
                    />
                )}
                {props?.type === TYPE_FIELD_FILTER.SLIDER && (
                    <Slider
                        range
                        min={0}
                        max={1000000}
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
