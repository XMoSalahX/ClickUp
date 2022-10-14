import { useState, createRef, useMemo } from "react";
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
import Loading from "../../../Components/Loading Page/Loading";
import { useSelector, useDispatch } from "react-redux";
import { loadingControl } from "../../../store/UserCollecions";

const config = new Config();

const Forget = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const loading = useSelector((state) => state.UserCollecions.loading);
  const emailRef = createRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formRender = useMemo(() => {
    const buttonData = {
      width: "100%",
      height: "40px",
      backgroundColor: "#7b68ee",
      color: "white",
      shadowColor: "rgb(10 10 51 / 10%)",
      margin: "20px 0 20px 0",
    };

    //const button handeler
    const buttonHandler = (e) => {
      e.preventDefault();

      const emailRes = Validatons(emailRef.current.value, "email");
      !emailRes && (emailRef.current.style.color = "red");

      const data = {
        email: emailRef.current.value,
      };

      if (emailRes) {
        dispatch(loadingControl(true));
        fetch(`${config.api}/api/users/getaccess`, {
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
              navigate("/auth/recover");
            } else {
              console.log(data);
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

        <MainButton
          buttonData={buttonData}
          stable={true}
          onClick={buttonHandler}
        >
          Send me the link
        </MainButton>
        <FormLink to="/auth">or Login</FormLink>
      </>
    );
  }, [dispatch, emailRef, navigate]);

  return (
    <div className="formContainer">
      {loading && <Loading />}
      <HeadAuth>Forgot your password?</HeadAuth>
      <FromError errorMsg={errorMsg} />
      <Form>{formRender}</Form>
    </div>
  );
};

export default Forget;
