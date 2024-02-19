import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";

import TextField from "../../components/TextField";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const user = useAuth();

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Email Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Password Required";
    }
    return errors;
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const { data } = await axios.post("/auth/login", {
        email: values.email,
        password: values.password,
      });
      if (data?.status) {
        localStorage.setItem("user", data?.id);
        navigate("/", {state : {name : data?.name}});
      }
    } catch (error) {
      if (error.response.data.message === "user does not exists") {
        setErrors({ email: "user does not exists" });
      } else if (error.response.data.message === "Password is incorrect") {
        setErrors({ password: "Password is incorrect" });
      } else if (error.response.data.message === "Password is Required") {
        setErrors({ password: "Password is Required" });
      } else if (error.response.data.message === "Email is Required") {
        setErrors({ email: "Email is Required" });
      }
    }
    finally{
      setSubmitting(false);
    }
  };

  return (
    <div class="login">
      <div class="login-container">
        <h2>Login</h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={validate}
          onSubmit={handleSubmit}
          validateOnChange={false}
        >
          {({
            values,
            handleSubmit,
            handleChange,
            handleBlur,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit}>
              <div className="mb-3">
                <TextField
                  label="Email"
                  placeholder="Enter Email"
                  type="email"
                  name="email"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  value={values.email}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="mb-3">
                <TextField
                  label="Password"
                  placeholder="Enter Password"
                  type="password"
                  name="password"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  value={values.password}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
        <hr />
        <div class="register-link">
          Dont have an account?
          <span to="/signin" onClick={() => navigate("/signin")}>
            Sign in
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
