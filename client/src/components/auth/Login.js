import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async e => {
    e.preventDefault();
    console.log("Successfully Logged In");
  };

  return (
    <div class="container mt-md-5 Login mt-5 p-3">
      <div className="container text-center mb-3 title">
        <h1>Login</h1>
      </div>
      <form>
        <div class="form-group">
          <label for="email">Email address</label>
          <input
            type="email"
            class="form-control"
            id="email"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={e => onChange(e)}
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e => onChange(e)}
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Login
        </button>
      </form>
      <div class="container mt-3 text-center">
        <Link to="/register">New to Gifoetry? Click here to register</Link>
      </div>
    </div>
  );
};

export default Login;
