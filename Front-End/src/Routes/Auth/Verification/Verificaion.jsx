import { createRef, useState, useMemo, memo } from "react";
import HeadAuth from "../../../Components/HeadAuth/HeadAuth";
import Form from "../../../Components/Form/Form";
import AuthInputContainer from "../../../Components/AuthInputContainer/AuthInputContainer";
import LableForm from "../../../Components/LableForm/LableForm";
import Input from "../../../Components/Input/Input";
import InputImg from "../../../Components/InputImg/InputImg";
import MainButton from "../../../Components/MainButton/MainButton";
import FormLink from "../../../Components/FormLink/FormLink";
import { Config } from "../../../config/config";
import Validatons from "../../../Hooks/Validations";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import FromError from "../../../Components/FormError/FromError";

const config = new Config();

const FormHandler = memo(({ setErrorMsg }) => {
  const navigate = useNavigate();
  const Email = useSelector((state) => state.Landing.signUpValue);

  // get inputs element
  const verificationCodeInput = useMemo(() => createRef(), []);

  const buttonData = {
    width: "100%",
    height: "40px",
    backgroundColor: "#7b68ee",
    color: "white",
    shadowColor: "rgb(10 10 51 / 10%)",
    margin: "20px 0 20px 0",
  };

  // Sign Up button handeler
  const buttonHandler = (e) => {
    e.preventDefault();
    console.log("helll");

    const verificaionCodeRef = Validatons(
      verificationCodeInput.current.value,
      "verify"
    );
    !verificaionCodeRef && (verificationCodeInput.current.style.color = "red");

    const data = {
      email: Email,
      verificationCode: parseInt(verificationCodeInput.current.value),
    };

    if (Email && verificaionCodeRef) {
      fetch(`${config.api}/api/users/verificaion`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.error);
          if (data.error === false) {
            console.log(data.error);
            navigate("/auth");
          } else {
            setErrorMsg(data.response_msg);
          }
        });
    }
  };

  return (
    <Form>
      <AuthInputContainer>
        <LableForm>Verification code</LableForm>
        <Input
          ref={verificationCodeInput}
          data={{
            type: "number",
            placeholder: "1234",
          }}
          width={"100%"}
          height={"25px"}
          paddingLeft={"40px"}
        />
        <InputImg
          src={"https://cdn-icons-png.flaticon.com/512/2191/2191124.png"}
          alt={"Verificaion code Logo"}
        />
      </AuthInputContainer>
      <MainButton buttonData={buttonData} stable={true} onClick={buttonHandler}>
        Verify
      </MainButton>
      <FormLink to="/auth">or Login</FormLink>
    </Form>
  );
});

const Verificaion = () => {
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <div className="formContainer">
      <HeadAuth>Let's go!</HeadAuth>
      <div>
        <img
          src="https://app-cdn.clickup.com/assets/images/onboarding/sign-up/validate-email.png"
          alt="Verificaion code"
          style={{
            width: "60%",
            marginBottom: "30px",
          }}
        ></img>
      </div>
      <FromError errorMsg={errorMsg} />
      <FormHandler setErrorMsg={setErrorMsg} />
    </div>
  );
};

export default Verificaion;
