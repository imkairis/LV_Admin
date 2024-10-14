import React from 'react';

import { FaUserAlt } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {loginRequestStart} from "~/Redux/auth/slice.jsx";
import * as PropTypes from "prop-types";
import { Button, Paper, TextField, } from '@mui/material';

Paper.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node
};
import '../auth/Auth.style.css';
const LoginForm = () => {
    const [username, setUsername,] = React.useState('');
    const [password, setPassword,] = React.useState('');

    const dispatch = useDispatch();
    const nav = useNavigate();

    const loginRequest = () => {
        dispatch(loginRequestStart(JSON.stringify({
            username, password,
        })));
        // nav(adminRoutes.profile);
    };

    return (
        <section className="container__auth">
            <div className="wrapper">
                <form className="form_auth">
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        <FaUserAlt className="icon" />
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FaLock className="icon" />
                    </div>
                    <div className="remember-forgot">
                        <a href="#">
                            <Link to="/forgot">Forgot Password</Link>
                        </a>
                    </div>
                    <button type="button" onClick={loginRequest}>Login</button>
                    <div className="register-link">
                        <p>
                            Don't have an account?{' '}
                            <Link to="/register">Register</Link>
                        </p>
                    </div>
                </form>
            </div>
        </section>
    );




};

export default LoginForm;
