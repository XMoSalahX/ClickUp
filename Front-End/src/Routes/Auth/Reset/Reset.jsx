import { useState, createRef, memo } from "react";
import HeadAuth from "../../../Components/HeadAuth/HeadAuth";
import Form from "../../../Components/Form/Form";
import AuthInputContainer from "../../../Components/AuthInputContainer/AuthInputContainer";
import LableForm from "../../../Components/LableForm/LableForm";
import Input from "../../../Components/Input/Input";
import InputImg from "../../../Components/InputImg/InputImg";
import InputImgCon from "../../../Components/InputImgCon/InputImgCon";
import MainButton from "../../../Components/MainButton/MainButton";
import FormLink from "../../../Components/FormLink/FormLink";
import FromError from "../../../Components/FormError/FromError";
import Validatons from "../../../Hooks/Validations";
import { Config } from "../../../config/config";
import { useNavigate, useSearchParams } from "react-router-dom";

const config = new Config();

const FormContainer = memo(({ setErrorMsg }) => {
  const buttonData = {
    width: "100%",
    height: "40px",
    backgroundColor: "#7b68ee",
    color: "white",
    shadowColor: "rgb(10 10 51 / 10%)",
    margin: "20px 0 20px 0",
  };

  const navigate = useNavigate();

  const [params] = useSearchParams();

  // get inputs element
  const passwordRef = createRef();
  const passwordRef2 = createRef();

  //const button handeler
  const buttonHandler = (e) => {
    e.preventDefault();

    const passwordRes = Validatons(passwordRef.current.value, "password");
    !passwordRes && (passwordRef.current.style.color = "red");

    const passwordRes2 = Validatons(passwordRef2.current.value, "password");
    !passwordRes2 && (passwordRef2.current.style.color = "red");

    const data = {
      password: passwordRef.current.value,
    };

    if (
      passwordRes &&
      passwordRes2 &&
      passwordRef.current.value === passwordRef2.current.value
    ) {
      fetch(`${config.api}/api/users/changepassword`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authraization: "bearer " + params.get("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error === false) {
            navigate("/auth");
          } else {
            setErrorMsg(data.response_msg);
          }
        });
    } else {
      passwordRef2.current.style.color = "red";
    }
  };

  return (
    <Form>
      <AuthInputContainer>
        <LableForm>Choose new password</LableForm>
        <InputImgCon>
          <Input
            ref={passwordRef}
            data={{
              type: "password",
              placeholder: "Minimum 8 caracters",
            }}
            width={"100%"}
            height={"25px"}
            paddingLeft={"40px"}
          />
          <InputImg
            src={"https://cdn-icons-png.flaticon.com/512/2889/2889676.png"}
            alt={"Email Logo"}
          />
        </InputImgCon>
      </AuthInputContainer>
      <AuthInputContainer>
        <LableForm>Confirm</LableForm>
        <InputImgCon>
          <Input
            ref={passwordRef2}
            data={{
              type: "password",
              placeholder: "Minimum 8 caracters",
            }}
            width={"100%"}
            height={"25px"}
            paddingLeft={"40px"}
          />
          <InputImg
            src={"https://cdn-icons-png.flaticon.com/512/2889/2889676.png"}
            alt={"Email Logo"}
          />
        </InputImgCon>
      </AuthInputContainer>
      <MainButton buttonData={buttonData} stable={true} onClick={buttonHandler}>
        Create password
      </MainButton>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <FormLink to="/">Go To Home Page</FormLink>
      </div>
    </Form>
  );
});

const Reset = () => {
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <div className="formContainer">
      <HeadAuth>Create a new password!</HeadAuth>
      <FromError errorMsg={errorMsg} />
      <FormContainer setErrorMsg={setErrorMsg} />
    </div>
  );
};

export default Reset;
