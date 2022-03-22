import React, { useState } from "react";
import Base from "../core/Base";
import { register } from "../auth/helper";
import "./form.css";
import { Link, Navigate, useLocation } from "react-router-dom";
const SignUp = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { username, email, password, error, success } = values;
  const location = useLocation();
  const handleChange = (name) => (event) => {
    console.log(name);
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const redirect = () => {
    if (localStorage.getItem("token")) {
      return <Navigate to="/dashboard" state={{ from: location }} replace />;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    register({ username, email, password })
      .then((data) => {
        console.log("DATA:", data);
        if (data.email === email || data.username === username) {
          setValues({
            ...values,
            username: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        } else {
          let errors = {
            username: data.username[0] ? data.username[0] : null,
            email: data.email[0] ? data.email[0] : null,
            password: data.password[0] ? data.password[0] : null,
          };
          setValues({ ...values, error: errors, success: false });
        }
      })
      .catch((err) => console.error(err));
  };

  const successMessage = () => {
    return success ? (
      <div className="container text-left">
        <div className="alert alert-success">
          New Account created successfully,{" "}
          <Link to="/login">Please login.</Link>
        </div>
      </div>
    ) : null;
  };

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-8 offset-sm-1 offset-md-2 col-lg-6 offset-lg-3 col-sm-10 text-left shadow-cus p-3 mb-5 bg-dark rounded">
          <h1 className="text-center">Create new Account</h1>
          {successMessage()}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                type="text"
                value={username}
                onChange={handleChange("username")}
                className="form-control"
              />
              {error.username ? (
                <span className=" form-text text-danger text-left font-weight-light">
                  {error.username.replace("This field may", "Username should")}
                </span>
              ) : null}
            </div>
            <div className="form-group">
              <label className="text-light">Email </label>
              <input
                type="text"
                value={email}
                onChange={handleChange("email")}
                className="form-control"
              />
              {error.email ? (
                <span className=" form-text text-danger text-left font-weight-light">
                  {error.email.replace("This field may", "Email should")}
                </span>
              ) : null}
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                type="password"
                value={password}
                onChange={handleChange("password")}
                className="form-control"
              />
              {error.password ? (
                <span className=" form-text text-danger text-left font-weight-light">
                  {error.password.replace("This field may", "Password should")}
                </span>
              ) : null}
            </div>
            <div>
              <input
                type="submit"
                value="Register"
                className="btn btn-success"
                style={{
                  float: "right",
                }}
              />
            </div>
          </form>
        </div>
      </div>
    );
  };
  return (
    <Base title="Sign Up page" description="Create A New Account">
      <p className="text-center">Test of SignUp.</p>
      {signUpForm()}
      <p className="text-info text-center">Debug:{JSON.stringify(values)}</p>
      {redirect()}
    </Base>
  );
};

export default SignUp;
