import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';

function AddProductTypeForm({ onSubmit }) {
    const schema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        description: Yup.string().required('Description is required'),
        image: Yup.string().required('Image is required'),
    });

    return (
        <Formik
            initialValues={{ name: '', description: '', image: '' }}
            validationSchema={schema}
            onSubmit={(values, { setSubmitting }) => {
                onSubmit(values);
                setSubmitting(false);
            }}
        >
            {({ errors, touched, isSubmitting }) => (
                <Form className="">
                    <div className="mb-2">
                        <Field
                            className="w-full border px-4 py-2 rounded-md shadow-md focus:outline-none"
                            name="name"
                            type="text"
                            placeholder="Name"
                        />
                        {errors.name && touched.name ? (
                            <small>{errors.name}</small>
                        ) : null}
                    </div>
                    <div className="mb-2">
                        <Field
                            className="w-full border px-4 py-2 rounded-md shadow-md focus:outline-none"
                            name="description"
                            type="text"
                            placeholder="Type"
                        />
                        {errors.description && touched.description ? (
                            <small>{errors.description}</small>
                        ) : null}
                    </div>
                    <div className="mb-4">
                        <Field name="image" type="file" placeholder="image" />
                        {errors.image && touched.image ? (
                            <small>{errors.image}</small>
                        ) : null}
                    </div>

                    <div className="flex justify-end">
                        <button
                            className="bg-blue-500 hover:bg-blue-600 duration-200 text-white px-4 py-2 rounded-md"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            Submit
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default AddProductTypeForm;
