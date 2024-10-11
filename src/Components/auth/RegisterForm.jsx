import React from "react";
import "./Auth.style.css";
import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { IoIosTime } from "react-icons/io";
import { FaMale } from "react-icons/fa";

const RegisterForm = () => {
  return (
    <section className="container__auth">
      <div className="wrapper">
        <form className="form_auth">
          <h1>Register</h1>
          <div className="input-box">
            <input type="text" placeholder="Fullname" required />
            <FaUserCircle className="icon" />
          </div>
          <div className="input-box">
            <input type="email" placeholder="Email" required />
            <MdEmail className="icon" />
          </div>
          <div className="input-box">
            <input type="phone" placeholder="Phone" required />
            <FaPhone className="icon" />
          </div>
          {/* <div className="input-box">
            <input type="date" placeholder="Birthday" required />
            <IoIosTime className="icon" />
          </div> */}

          {/* <div className="input-box">
            <input type="text" placeholder="Gender" required />
            <FaMale className="icon" />
          </div> */}
          {/* <div className="input-box">
            <input type="text" placeholder="Username" required />
            <FaUserAlt className="icon" />
          </div> */}
          <div className="input-box">
            <input type="password" placeholder="Password" required />
            <FaLock className="icon" />
          </div>
          <button type="submit">Register</button>
          <div className="register-link">
            <p>
              Already member? <Link to="/">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RegisterForm;
