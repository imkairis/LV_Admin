import { Form, Formik, Field } from 'formik';
import { QUERY_KEYS } from '~/Constants';
import { useQueryDefault } from '~/Hooks';
import { getAllAges, getAllProductTypes, getAllTargets } from '~/services';
import * as Yup from 'yup';
import { useMemo } from 'react';
import SliderImageAddProduct from '../SliderImageAddProduct';

function AddProductForm({ onSubmit }) {
    const { data: productTypes, isLoading: loadingType } = useQueryDefault({
        keys: [QUERY_KEYS.PRODUCT_TYPES],
        fn: getAllProductTypes,
        limit: 999999,
    });
    const { data: ageGroups, isLoading: loadingAgeGroup } = useQueryDefault({
        keys: [QUERY_KEYS.AGE_GROUPS],
        fn: getAllAges,
        limit: 999999,
    });
    const { data: targetAudiences, isLoading: loadingTargetAudience } =
        useQueryDefault({
            keys: [QUERY_KEYS.TARGET_AUDIENCES],
            fn: getAllTargets,
            limit: 999999,
        });

    const schema = useMemo(() => {
        return Yup.object().shape({
            name: Yup.string().required('Name is required'),
            price: Yup.number().required('Price is required'),
            type: Yup.string().required('Type is required'),
            quantity: Yup.number().required('Quantity is required'),
            cost: Yup.number().required('Cost is required'),
            stockQuantity: Yup.number().required('Stock quantity is required'),
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
            initialValues={{
                name: '',
                price: '',
                type: '',
                quantity: '',
                cost: '',
                stockQuantity: '',
                weight: '',
                origin: '',
                targetAudience: '',
                ageGroup: '',
                dateOfManufacture: '',
                expirationDate: '',
                description: '',
                userManual: '',
                element: '',
            }}
            validationSchema={schema}
            onSubmit={(values, { setSubmitting }) => {
                const formData = new FormData();
                for (const key in values) {
                    if (key === 'images') {
                        for (let i = 0; i < values[key].length; i++) {
                            formData.append('images', values[key][i]);
                        }
                    } else {
                        formData.append(key, values[key]);
                    }
                }
                console.log('formData', formData);
                onSubmit(formData);

                // onSubmit(values);
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
                                    className="border p-2 rounded-md"
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
                                        className="border p-2 rounded-md"
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
                                        className="border p-2 rounded-md"
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
                                        className="border p-2 rounded-md"
                                    />
                                    {errors.quantity && touched.quantity && (
                                        <div className="text-red-500">
                                            {errors.quantity}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex flex-col gap-2 flex-1">
                                    <label htmlFor="cost">Cost</label>
                                    <Field
                                        type="number"
                                        id="cost"
                                        name="cost"
                                        placeholder="Product cost"
                                        className="border p-2 rounded-md"
                                    />
                                    {errors.cost && touched.cost && (
                                        <div className="text-red-500">
                                            {errors.cost}
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2 flex-1">
                                    <label htmlFor="stockQuantity">
                                        Stock Quantity
                                    </label>
                                    <Field
                                        type="number"
                                        id="stockQuantity"
                                        name="stockQuantity"
                                        placeholder="Product stock quantity"
                                        className="border p-2 rounded-md"
                                    />
                                    {errors.stockQuantity &&
                                        touched.stockQuantity && (
                                            <div className="text-red-500">
                                                {errors.stockQuantity}
                                            </div>
                                        )}
                                </div>
                                <div className="flex flex-col gap-2 flex-1">
                                    <label htmlFor="weight">Weight</label>
                                    <Field
                                        type="number"
                                        id="weight"
                                        name="weight"
                                        placeholder="Product weight"
                                        className="border p-2 rounded-md"
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
                                        className="border p-2 rounded-md"
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
                                        className="border p-2 rounded-md"
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
                                        className="border p-2 rounded-md"
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
                                        className="border p-2 rounded-md"
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
                                        className="border p-2 rounded-md"
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
                                    className="border p-2 rounded-md"
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
                                    className="border p-2 rounded-md"
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
                                    className="border p-2 rounded-md"
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
                                        className="border p-2 rounded-md"
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
                                />
                            </div>
                            <div className="mt-6 flex justify-center">
                                <button
                                    type="submit"
                                    className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                                >
                                    {isSubmitting
                                        ? 'Adding product...'
                                        : 'Add Product'}
                                </button>
                            </div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default AddProductForm;
