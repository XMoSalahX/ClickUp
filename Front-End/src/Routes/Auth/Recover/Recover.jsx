import React from "react";
import HeadAuth from "../../../Components/HeadAuth/HeadAuth";
import Form from "../../../Components/Form/Form";
import FormLink from "../../../Components/FormLink/FormLink";

export default function Recover() {
  return (
    <div className="formContainer">
      <HeadAuth>Recovery link sent!</HeadAuth>
      <div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/4144/4144781.png"
          alt="Recovery link sent!"
          style={{
            width: "60%",
            marginBottom: "30px",
          }}
        ></img>
      </div>
      <Form>
        <FormLink to="/auth">Login</FormLink>
      </Form>
    </div>
  );
}
