import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authenticate, isAuthenticated, login } from "../auth/helper";
import Base from "../core/Base";

const SignIn = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    success: false,
    loading: false,
    didRedirect: false,
  });
  const location = useLocation();

  const { email, password, success, error, loading, didRedirect } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const successMessage = () => {
    return success ? (
      <div className="container text-left">
        <div className="alert alert-success">Logged in</div>
      </div>
    ) : null;
  };

  const errorMessage = () => {
    return error ? (
      <div className="container text-left">
        <div className="alert alert-danger">{error}</div>
      </div>
    ) : null;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    login({ email, password })
      .then((data) => {
        console.log("DATA", data);
        if (data.token) {
          // let sessionToken = data.token;
          authenticate(data, () => {
            console.log("Token added to local storage with key token");
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        } else if (data.error) {
          console.log(data.error);
          setValues({
            ...values,
            error: data.error,
          });
        } else {
          setValues({
            ...values,
            loading: false,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const redirect = () => {
    if (isAuthenticated()) {
      return <Navigate to="/dashboard" state={{ from: location }} replace />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>....Loading</h2>
        </div>
      )
    );
  };

  const loginForm = () => {
    return (
      <div className="row">
        <div className="col-md-8 offset-sm-1 offset-md-2 col-lg-6 offset-lg-3 col-sm-10 text-left shadow-cus p-3 mb-5 bg-dark rounded">
          <h1 className="text-center">Login</h1>
          {successMessage()}
          {errorMessage()}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="text-light">Email </label>
              <input
                type="text"
                value={email}
                onChange={handleChange("email")}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                type="password"
                value={password}
                onChange={handleChange("password")}
                className="form-control"
              />
            </div>
            <div>
              <input
                type="submit"
                value="Login"
                className="btn btn-success"
                disabled={loading}
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
    <Base title="Login page" description="Please Login ">
      {loadingMessage()}
      {loginForm()}
      <p className="text-center text-info">Debug:{JSON.stringify(values)}</p>
      {redirect()}
    </Base>
  );
};

export default SignIn;
