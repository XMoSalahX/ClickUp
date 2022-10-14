import { createRef, memo, useEffect, useState } from "react";
import HeadAuth from "../../../Components/HeadAuth/HeadAuth";
import Form from "../../../Components/Form/Form";
import AuthInputContainer from "../../../Components/AuthInputContainer/AuthInputContainer";
import LableForm from "../../../Components/LableForm/LableForm";
import Input from "../../../Components/Input/Input";
import InputImg from "../../../Components/InputImg/InputImg";
import InputImgCon from "../../../Components/InputImgCon/InputImgCon";
import MainButton from "../../../Components/MainButton/MainButton";
import FormLink from "../../../Components/FormLink/FormLink";
import Validatons from "../../../Hooks/Validations";
import { Config } from "../../../config/config";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import FromError from "../../../Components/FormError/FromError";
import { setvalue } from "../../../store/LandingSlice";
import Loading from "../../../Components/Loading Page/Loading";
import { loadingControl } from "../../../store/UserCollecions";

const config = new Config();

const Test = memo(({ setErrorMsg }) => {
  const navigate = useNavigate();
  const usernameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const dispatch = useDispatch();

  const buttonData = {
    width: "100%",
    height: "40px",
    backgroundColor: "#7b68ee",
    color: "white",
    shadowColor: "rgb(10 10 51 / 10%)",
    margin: "20px 0 20px 0",
  };

  const Landing = useSelector((state) => state.Landing);

  useEffect(() => {
    emailRef.current.value = Landing.signUpValue;
  });

  // Sign Up button handeler
  const buttonHandler = (e) => {
    e.preventDefault();

    const userRes = Validatons(usernameRef.current.value, "username");
    !userRes && (usernameRef.current.style.color = "red");

    const emailRes = Validatons(emailRef.current.value, "email");
    !emailRes && (emailRef.current.style.color = "red");

    const passwordRes = Validatons(passwordRef.current.value, "password");
    !passwordRes && (passwordRef.current.style.color = "red");

    const data = {
      name: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    if (userRes && passwordRes && emailRes) {
      dispatch(setvalue(emailRef.current.value));
      dispatch(loadingControl(true));
      fetch(`${config.api}/api/users/create`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch(loadingControl(false));
          if (data.error === false) {
            navigate("/auth/verify");
          } else {
            setErrorMsg(data.response_msg);
          }
        });
    }
  };

  return (
    <Form>
      <AuthInputContainer>
        <LableForm>Full Name</LableForm>
        <Input
          ref={usernameRef}
          data={{
            type: "text",
            placeholder: "John Doe",
          }}
          width={"100%"}
          height={"25px"}
          paddingLeft={"40px"}
        />
        <InputImg
          src={"https://cdn-icons-png.flaticon.com/512/2105/2105556.png"}
          alt={"User Logo"}
        />
      </AuthInputContainer>
      <AuthInputContainer>
        <LableForm>Email</LableForm>
        <InputImgCon>
          <Input
            ref={emailRef}
            data={{
              type: "email",
              placeholder: "Example@Website.com",
            }}
            width={"100%"}
            height={"25px"}
            paddingLeft={"40px"}
          />
          <InputImg
            src={"https://cdn-icons-png.flaticon.com/512/546/546394.png"}
            alt={"Email Logo"}
          />
        </InputImgCon>
      </AuthInputContainer>
      <AuthInputContainer>
        <LableForm>Choose Password</LableForm>
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
      <MainButton buttonData={buttonData} stable={true} onClick={buttonHandler}>
        Play with ClickUp
      </MainButton>
      <FormLink to="/auth">or Login</FormLink>
    </Form>
  );
});

const SignUp = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const loading = useSelector((state) => state.UserCollecions.loading);

  return (
    <div className="formContainer">
      {loading && <Loading />}
      <HeadAuth>Let's go!</HeadAuth>
      <FromError errorMsg={errorMsg} />
      <Test setErrorMsg={setErrorMsg} />
    </div>
  );
};

export default SignUp;
