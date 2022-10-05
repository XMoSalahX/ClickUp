import React from "react";
import { useNavigate } from "react-router-dom";
import HeadAuth from "../../Components/HeadAuth/HeadAuth";
import Form from "../../Components/Form/Form";
import MainButton from "../../Components/MainButton/MainButton";
import FormLink from "../../Components/FormLink/FormLink";

const Verificaion = () => {
  const buttonData = {
    width: "100%",
    height: "40px",
    backgroundColor: "#7b68ee",
    color: "white",
    shadowColor: "rgb(10 10 51 / 10%)",
    margin: "20px 0 20px 0",
  };

  const navigate = useNavigate();

  const buttonHandeler = () => {
    navigate("/");
  };

  return (
    <div className="formContainer">
      <HeadAuth>Page not Found!</HeadAuth>
      <div>
        <img
          src="https://clickup.com/images/404/404-graphic@2x.png"
          alt="Verificaion code"
          style={{
            width: "60%",
            marginBottom: "30px",
          }}
        ></img>
      </div>
      <Form>
        <MainButton
          buttonData={buttonData}
          stable={true}
          onClick={buttonHandeler}
        >
          Home page
        </MainButton>
        <FormLink to="/contact">Contact us</FormLink>
      </Form>
    </div>
  );
};

export default Verificaion;
