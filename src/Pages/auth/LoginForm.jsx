import { Link, useNavigate } from 'react-router-dom';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { GoEye, GoEyeClosed } from 'react-icons/go';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';

import './Auth.style.css';
import { useState } from 'react';
import { login } from '~/services';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { login as loginReducer } from '~/store/authSlice';

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmitFormik = (values, setSubmitting) => {
        login(values.username, values.password)
            .then((res) => {
                dispatch(loginReducer(res.data));
                navigate('/');
            })
            .catch((err) => {
                console.error(err?.response);
                toast.error(
                    err?.response?.data?.error ||
                        err?.response?.data?.msg ||
                        'Something went wrong'
                );
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    const loginSchema = Yup.object().shape({
        username: Yup.string().required('Please enter your username'),
        password: Yup.string().required('Please enter your password'),
    });

    return (
        <section className="container__auth">
            <div className="wrapper">
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={loginSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        handleSubmitFormik(values, setSubmitting);
                    }}
                >
                    {({
                        errors,
                        touched,
                        handleSubmit,
                        isSubmitting,
                        values,
                    }) => (
                        <Form className="form_auth" onSubmit={handleSubmit}>
                            <h1>Login</h1>

                            <div className="input-box">
                                <Field
                                    name="username"
                                    type="text"
                                    placeholder="Enter your username"
                                />
                                <FaUserAlt className="icon" />
                                {errors.username && touched.username ? (
                                    <small>{errors.username}</small>
                                ) : null}
                            </div>

                            <div className="input-box">
                                <Field
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                />
                                {values.password.length > 0 ? (
                                    <span
                                        className="cursor-pointer"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        {showPassword ? (
                                            <GoEyeClosed className="icon" />
                                        ) : (
                                            <GoEye className="icon" />
                                        )}
                                    </span>
                                ) : (
                                    <FaLock className="icon" />
                                )}
                                {errors.password && touched.password ? (
                                    <small>{errors.password}</small>
                                ) : null}
                            </div>

                            <button
                                className={`mt-6 ${
                                    isSubmitting ? 'opacity-70' : ''
                                }`}
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Loading...' : 'Login'}
                            </button>

                            <div className="register-link">
                                <p>
                                    Don&apos;t have an account?{' '}
                                    <Link to="/register">Register</Link>
                                </p>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </section>
    );
};

export default LoginForm;
