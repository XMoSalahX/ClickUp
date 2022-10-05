import React from "react";
import "./Input.module.css";
import { forwardRef } from "react";

const Input = forwardRef(
  ({ data, dispatch, width, height, paddingLeft }, ref) => {
    return (
      <input
        style={{
          width: width ? width : "360px",
          height: height ? height : "auto",
          paddingLeft: paddingLeft || "auto",
        }}
        ref={ref}
        onChange={(e) => {
          dispatch && dispatch(e.target.value);
          e.target.style.color = "black";
        }}
        type={data.type}
        placeholder={data.placeholder}
      ></input>
    );
  }
);

export default Input;
