import React from "react";
import { Link } from "react-router-dom";

const FormLink = ({ children, to }) => {
  return (
    <Link
      to={to}
      style={{
        color: "#7b68ee",
        fontSize: "12px",
        display: "inline-block",
        marginBottom: "50px",
      }}
    >
      {children}
    </Link>
  );
};

export default FormLink;
