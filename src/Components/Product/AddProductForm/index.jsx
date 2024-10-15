import { Form, Formik, Field } from 'formik';

function AddProductForm() {
    return (
        <Formik>
            {({ errors, touched, handleSubmit, isSubmitting, values }) => (
                <Form>
                    <Field name="name" type="text" placeholder="Name" />
                    <Field name="type" type="text" placeholder="Type" />
                </Form>
            )}
        </Formik>
    );
}

export default AddProductForm;
