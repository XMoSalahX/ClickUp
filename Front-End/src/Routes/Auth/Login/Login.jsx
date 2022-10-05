import { useMemo, useState, createRef } from "react";
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
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../../store/UserCollecions";

const config = new Config();

const Login = () => {
  const token = useSelector((state) => state.UserCollecions.token);
  if (token !== "") {
    fetch(`${config.api}/checkauth`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        authorization: "bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => !data.error && navigate("/workspace"));
  }

  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // Form Reneder in height preformance mode
  const formHandler = useMemo(() => {
    const buttonData = {
      width: "100%",
      height: "40px",
      backgroundColor: "#7b68ee",
      color: "white",
      shadowColor: "rgb(10 10 51 / 10%)",
      margin: "20px 0 20px 0",
    };

    // get inputs element
    const emailRef = createRef();
    const passwordRef = createRef();

    //const button handeler
    const buttonHandler = (e) => {
      e.preventDefault();

      const emailRes = Validatons(emailRef.current.value, "email");
      !emailRes && (emailRef.current.style.color = "red");

      const passwordRes = Validatons(passwordRef.current.value, "password");
      !passwordRes && (passwordRef.current.style.color = "red");

      const data = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };

      if (passwordRes && emailRes) {
        fetch(`${config.api}/api/users/auth`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            credentials: "include",
            withCredentials: true,
            mode: "cors",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error === false) {
              dispatch(setToken(data.token));
              navigate("/workspace");
            } else {
              setErrorMsg(data.response_msg);
            }
          });
      }
    };

    return (
      <>
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
          <LableForm>Password</LableForm>
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

        <MainButton
          buttonData={buttonData}
          stable={true}
          onClick={buttonHandler}
        >
          Login
        </MainButton>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <FormLink to="/auth/forgot">Forgot password?</FormLink>

          <FormLink to="/auth/signup">SignUp</FormLink>
        </div>
      </>
    );
  }, [dispatch, navigate]);

  return (
    <div className="formContainer">
      <HeadAuth>Welcome back!</HeadAuth>
      <FromError errorMsg={errorMsg} />
      <Form>{formHandler}</Form>
    </div>
  );
};

export default Login;
