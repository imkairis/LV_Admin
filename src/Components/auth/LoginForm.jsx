import React from 'react';

import { FaUserAlt } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../auth/Auth.style.css';
const LoginForm = () => {
    return (
        <section className="container__auth">
            <div className="wrapper">
                <form className="form_auth">
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Username" required />
                        <FaUserAlt className="icon" />
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Password"
                            required
                        />
                        <FaLock className="icon" />
                    </div>
                    <div className="remember-forgot">
                        <a href="#">
                            <Link to="/forgot">Forgot Password</Link>
                        </a>
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </section>
    );
};

export default LoginForm;
