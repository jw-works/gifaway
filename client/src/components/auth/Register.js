import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";
import "./Register.css";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: ""
  });

  const { username, email, password, password2 } = formData;

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({ username, email, password });
      setFormData({
        username: "",
        email: "",
        password: "",
        password2: ""
      });
    }
  };

  //After successful registration
  if (isAuthenticated) {
    return <Redirect to="/dashboard"></Redirect>;
  }

  return (
    <div className="container mt-md-5 mt-2 p-3 Register">
      <div className="container text-center mb-3 title">
        <h1>Register</h1>
      </div>
      <form onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <label htmlFor="password2">Display name</label>
          <input
            type="text"
            className="form-control"
            id="displayName"
            aria-describedby="usernameHelp"
            placeholder="Enter Username"
            name="username"
            value={username}
            onChange={e => onChange(e)}
          />
          <small id="usernameHelp" className="form-text text-muted">
            This will be unique to yourself and will be shown as your name on
            this website.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={e => onChange(e)}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            aria-describedby="passwordHelp"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e => onChange(e)}
          />
          <small id="passwordHelp" className="form-text text-muted">
            Minimum 8 characters
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="password2">Re-enter Password</label>
          <input
            type="password"
            className="form-control"
            id="password2"
            aria-describedby="password2Help"
            placeholder="Re-enter Password"
            name="password2"
            value={password2}
            onChange={e => onChange(e)}
          />
          <small id="password2Help" className="form-text text-muted">
            Minimum 8 characters
          </small>
        </div>

        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
      <div className="container mt-3 text-center">
        <Link to="/login">Registered already? Click here to login</Link>
      </div>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert, register }
)(Register);
