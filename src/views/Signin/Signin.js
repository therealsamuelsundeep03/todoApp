import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";

import TextField from "../../components/TextField";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import "./Signin.css";

const SignIn = () => {
  const navigate = useNavigate();
  const user = useAuth();

  const handleValidate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Name is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-_]).{8,}/.test(
        values.password
      )
    ) {
      errors.password =
        "Password must have capital, small, number, special character, and at least 8 characters";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Passwords must match";
    }
    return errors;
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const { data } = await axios.post("/auth/register", {
        email: values.email,
        password: values.password,
        userName: values.name,
      });
      if (data.status) {
        alert("Kindly verify your mail");
      }
    } catch (error) {
      if(error?.response?.data?.message === "Email is Required"){
        setErrors({ email: 'Email is Required' });
      }else if(error?.response?.data?.message === "Password is Required"){
        setErrors({ password: 'Password is Required' });
      }else if(error?.response?.data?.message === "Name is Required"){
        setErrors({ name: 'Name is Required' });
      }else if(error?.response?.data?.message === "user exists"){
        setErrors({ email: 'User already exists' });
      }
    }
    finally{
      setSubmitting(false);
    }
  };

  return (
    <div className="register">
      <div className="register-container">
        <h2>Sign In</h2>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validate={handleValidate}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur, isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <TextField
                  label="Name"
                  placeholder="Enter name"
                  type="name"
                  name="name"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  value={values.name}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="error-message"
                />
              </div>
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
                  className="error-message pass-error"
                />
              </div>
              <div className="mb-3">
                <TextField
                  label="Confirm password"
                  placeholder="Enter Password"
                  type="password"
                  name="confirmPassword"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  value={values.confirmPassword}
                />
                <ErrorMessage
                  name="confirmPassword"
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
        <div class="login-link">
          Already have an account? 
          <span onClick={() => navigate("/login")}>
             Login
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
