import React from "react";
import { Form } from "react-bootstrap";

const TextField = ({ label, name, placeholder, value, type, handleBlur, handleChange }) => {
  return (
    <div>
      <Form.Label className="form-label">{ label }</Form.Label>
      <Form.Control
        type={type}
        value={value}
        className="form-control"
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default TextField;
