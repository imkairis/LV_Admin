import { Form, Formik, Field } from 'formik';
import { QUERY_KEYS } from '~/Constants';
import { useQueryDefault } from '~/Hooks';
import { getAllAges, getAllProductTypes, getAllTargets } from '~/services';
import * as Yup from 'yup';
import { memo, useMemo, useState } from 'react';
import SliderImageAddProduct from '../SliderImageAddProduct';

const initialValuesDefault = {
    name: '',
    price: '',
    type: '',
    quantity: '',
    // cost: '',
    // stockQuantity: '',
    weight: '',
    origin: '',
    targetAudience: '',
    ageGroup: '',
    dateOfManufacture: '',
    expirationDate: '',
    description: '',
    userManual: '',
    element: '',
};

function ProductForm({ onSubmit, initialValues = initialValuesDefault }) {
    const isEditMode = initialValues !== initialValuesDefault;
    const { data: productTypes, isLoading: loadingType } = useQueryDefault({
        keys: [QUERY_KEYS.PRODUCT_TYPES],
        fn: () => getAllProductTypes({ limit: 999999 }),
    });
    const { data: ageGroups, isLoading: loadingAgeGroup } = useQueryDefault({
        keys: [QUERY_KEYS.AGE_GROUPS],
        fn: () => getAllAges({ limit: 999999 }),
    });
    const { data: targetAudiences, isLoading: loadingTargetAudience } =
        useQueryDefault({
            keys: [QUERY_KEYS.TARGET_AUDIENCES],
            fn: () => getAllTargets({ limit: 99999 }),
        });
    const [removeImages, setRemoveImages] = useState([]);

    const schema = useMemo(() => {
        return Yup.object().shape({
            name: Yup.string().required('Name is required'),
            price: Yup.number().required('Price is required'),
            type: Yup.string().required('Type is required'),
            quantity: Yup.number().required('Quantity is required'),
            // cost: Yup.number().required('Cost is required'),
            // stockQuantity: Yup.number().required('Stock quantity is required'),
            weight: Yup.number().required('Weight is required'),
            origin: Yup.string().required('Origin is required'),
            targetAudience: Yup.string().required(
                'Target audience is required'
            ),
            ageGroup: Yup.string().required('Age group is required'),
            dateOfManufacture: Yup.date()
                .required('Date of manufacture is required')
                .max(new Date(), 'Date of manufacture must be less than today'),
            expirationDate: Yup.date()
                .required('Expiration date is required')
                .min(new Date(), 'Expiration date must be greater than today'),
            description: Yup.string().required('Description is required'),
            userManual: Yup.string().required('User manual is required'),
            element: Yup.string().required('Element is required'),
            images: Yup.mixed().required('Images are required'),
        });
    }, []);

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={(values, { setSubmitting }) => {
                const formData = new FormData();
                for (const key in values) {
                    if (key === 'images') {
                        for (let i = 0; i < values[key].length; i++) {
                            if (typeof values[key][i] === 'string') {
                                continue;
                            }
                            formData.append('images', values[key][i]);
                        }
                    } else {
                        formData.append(key, values[key]);
                    }
                }
                if (removeImages.length > 0) {
                    formData.append(
                        'removeImages',
                        JSON.stringify(removeImages)
                    );
                }
                onSubmit(formData);
                setSubmitting(false);
            }}
        >
            {({
                errors,
                touched,
                isSubmitting,
                setFieldValue,
                handleSubmit,
                values,
            }) => (
                <Form onSubmit={handleSubmit}>
                    <div className="flex gap-8 flex-col md:flex-row">
                        <div className="flex flex-col gap-4 flex-[4]">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name">Name</label>
                                <Field
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Product name"
                                    className="p-2 rounded-md dark:bg-gray-800"
                                />
                                {errors.name && touched.name && (
                                    <div className="text-red-500">
                                        {errors.name}
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-4">
                                <div className="flex flex-col gap-2 flex-1">
                                    <label htmlFor="price">Price</label>
                                    <Field
                                        type="number"
                                        id="price"
                                        name="price"
                                        placeholder="Product price"
                                        className="p-2 rounded-md dark:bg-gray-800"
                                    />
                                    {errors.price && touched.price && (
                                        <div className="text-red-500">
                                            {errors.price}
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2 flex-1">
                                    <label htmlFor="type">Type</label>
                                    <Field
                                        as="select"
                                        id="type"
                                        name="type"
                                        className="p-2 rounded-md dark:bg-gray-800"
                                    >
                                        {loadingType ? (
                                            <option>Loading...</option>
                                        ) : (
                                            <>
                                                <option value="">
                                                    Product type
                                                </option>
                                                {productTypes?.data?.map(
                                                    (type) => (
                                                        <option
                                                            key={type._id}
                                                            value={type._id}
                                                        >
                                                            {type?.name}
                                                        </option>
                                                    )
                                                )}
                                            </>
                                        )}
                                    </Field>
                                    {errors.type && touched.type && (
                                        <div className="text-red-500">
                                            {errors.type}
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2 flex-1">
                                    <label htmlFor="quantity">Quantity</label>
                                    <Field
                                        type="number"
                                        id="quantity"
                                        name="quantity"
                                        placeholder="Product quantity"
                                        className="p-2 rounded-md dark:bg-gray-800"
                                    />
                                    {errors.quantity && touched.quantity && (
                                        <div className="text-red-500">
                                            {errors.quantity}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-4">
                                {/* <div className="flex flex-col gap-2 flex-1">
                                    <label htmlFor="cost">Cost</label>
                                    <Field
                                        type="number"
                                        id="cost"
                                        name="cost"
                                        placeholder="Product cost"
                                        className="p-2 rounded-md dark:bg-gray-800"
                                    />
                                    {errors.cost && touched.cost && (
                                        <div className="text-red-500">
                                            {errors.cost}
                                        </div>
                                    )}
                                </div> */}
                                {/* <div className="flex flex-col gap-2 flex-1">
                                    <label htmlFor="stockQuantity">
                                        Stock Quantity
                                    </label>
                                    <Field
                                        type="number"
                                        id="stockQuantity"
                                        name="stockQuantity"
                                        placeholder="Product stock quantity"
                                        className="p-2 rounded-md dark:bg-gray-800"
                                    />
                                    {errors.stockQuantity &&
                                        touched.stockQuantity && (
                                            <div className="text-red-500">
                                                {errors.stockQuantity}
                                            </div>
                                        )}
                                </div> */}
                                <div className="flex flex-col gap-2 flex-1">
                                    <label htmlFor="weight">Weight</label>
                                    <Field
                                        type="number"
                                        id="weight"
                                        name="weight"
                                        placeholder="Product weight"
                                        className="p-2 rounded-md dark:bg-gray-800"
                                    />
                                    {errors.weight && touched.weight && (
                                        <div className="text-red-500">
                                            {errors.weight}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex flex-col gap-2 flex-1">
                                    <label htmlFor="origin">Origin</label>
                                    <Field
                                        type="text"
                                        id="origin"
                                        name="origin"
                                        placeholder="Product origin"
                                        className="p-2 rounded-md dark:bg-gray-800"
                                    />
                                    {errors.origin && touched.origin && (
                                        <div className="text-red-500">
                                            {errors.origin}
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2 flex-1">
                                    <label htmlFor="targetAudience">
                                        Target Audience
                                    </label>
                                    <Field
                                        as="select"
                                        id="targetAudience"
                                        name="targetAudience"
                                        placeholder="Product target audience"
                                        className="p-2 rounded-md dark:bg-gray-800"
                                    >
                                        {loadingTargetAudience ? (
                                            <option>Loading...</option>
                                        ) : (
                                            <>
                                                <option value="">
                                                    Product target audience
                                                </option>
                                                {targetAudiences?.data?.map(
                                                    (type) => (
                                                        <option
                                                            key={type._id}
                                                            value={type._id}
                                                        >
                                                            {type?.name}
                                                        </option>
                                                    )
                                                )}
                                            </>
                                        )}
                                    </Field>
                                    {errors.targetAudience &&
                                        touched.targetAudience && (
                                            <div className="text-red-500">
                                                {errors.targetAudience}
                                            </div>
                                        )}
                                </div>
                                <div className="flex flex-col gap-2 flex-1">
                                    <label htmlFor="ageGroup">Age Group</label>
                                    <Field
                                        as="select"
                                        id="ageGroup"
                                        name="ageGroup"
                                        placeholder="Age group"
                                        className="p-2 rounded-md dark:bg-gray-800"
                                    >
                                        {loadingAgeGroup ? (
                                            <option>Loading...</option>
                                        ) : (
                                            <>
                                                <option value="">
                                                    Age group
                                                </option>
                                                {ageGroups?.data?.map(
                                                    (type) => (
                                                        <option
                                                            key={type._id}
                                                            value={type._id}
                                                        >
                                                            {type?.name}
                                                        </option>
                                                    )
                                                )}
                                            </>
                                        )}
                                    </Field>
                                    {errors.ageGroup && touched.ageGroup && (
                                        <div className="text-red-500">
                                            {errors.ageGroup}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex flex-col gap-2 flex-1">
                                    <label htmlFor="dateOfManufacture">
                                        Date of Manufacture
                                    </label>
                                    <Field
                                        type="date"
                                        id="dateOfManufacture"
                                        name="dateOfManufacture"
                                        placeholder="Product date of manufacture"
                                        className="p-2 rounded-md dark:bg-gray-800"
                                    />
                                    {errors.dateOfManufacture &&
                                        touched.dateOfManufacture && (
                                            <div className="text-red-500">
                                                {errors.dateOfManufacture}
                                            </div>
                                        )}
                                </div>
                                <div className="flex flex-col gap-2 flex-1">
                                    <label htmlFor="expirationDate">
                                        Expiration Date
                                    </label>
                                    <Field
                                        type="date"
                                        id="expirationDate"
                                        name="expirationDate"
                                        placeholder="Product expiration date"
                                        className="p-2 rounded-md dark:bg-gray-800"
                                    />
                                    {errors.expirationDate &&
                                        touched.expirationDate && (
                                            <div className="text-red-500">
                                                {errors.expirationDate}
                                            </div>
                                        )}
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="description">Description</label>
                                <Field
                                    as="textarea"
                                    id="description"
                                    name="description"
                                    placeholder="Product description"
                                    className="p-2 rounded-md dark:bg-gray-800"
                                />
                                {errors.description && touched.description && (
                                    <div className="text-red-500">
                                        {errors.description}
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="userManual">User Manual</label>
                                <Field
                                    as="textarea"
                                    id="userManual"
                                    name="userManual"
                                    placeholder="Product user manual"
                                    className="p-2 rounded-md dark:bg-gray-800"
                                />
                                {errors.userManual && touched.userManual && (
                                    <div className="text-red-500">
                                        {errors.userManual}
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="element">Element</label>
                                <Field
                                    as="textarea"
                                    id="element"
                                    name="element"
                                    placeholder="Product element"
                                    className="p-2 rounded-md dark:bg-gray-800"
                                />
                                {errors.element && touched.element && (
                                    <div className="text-red-500">
                                        {errors.element}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex-[3]">
                            <div className="space-y-4">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="images">Images</label>
                                    <input
                                        type="file"
                                        id="images"
                                        name="images"
                                        placeholder="Product images"
                                        className="p-2 rounded-md dark:bg-gray-800"
                                        multiple
                                        onChange={(event) => {
                                            if (event.currentTarget.files) {
                                                setFieldValue(
                                                    'images',
                                                    event.currentTarget.files
                                                );
                                            }
                                        }}
                                    />
                                    {errors.images && touched.images && (
                                        <div className="text-red-500">
                                            {errors.images}
                                        </div>
                                    )}
                                </div>
                                <SliderImageAddProduct
                                    images={values?.images}
                                    isEditMode={isEditMode}
                                    setFieldValue={setFieldValue}
                                    setRemoveImages={setRemoveImages}
                                />
                            </div>
                            <div className="mt-6 flex justify-center">
                                <button
                                    type="submit"
                                    className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                                >
                                    {isSubmitting ? 'Loading...' : 'Submit'}
                                </button>
                            </div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default memo(ProductForm);
