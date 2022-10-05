import MainButton from "../MainButton/MainButton";
import { memo, useState, useMemo, useCallback } from "react";
import validations from "../../Hooks/Validations";
import LandingOverlaySignUp from "../LandingOverlaySignUp/LandingOverlaySignUp";
import { useNavigate } from "react-router-dom";

export default memo(function NavAuth({ small }) {
  const Login = useMemo(() => {
    return {
      width: small ? "100%" : "110px",
      height: "40px",
      backgroundColor: "white",
      color: "#7b68ee",
      id: 1,
      shadowColor: "rgba(124,104,238,.5)",
      margin: small ? "0 0 20px 0" : "0 10px 0 0",
    };
  }, [small]);
  const signUp = useMemo(() => {
    return {
      width: small ? "100%" : "110px",
      height: "40px",
      backgroundColor: small ? "#7b68ee" : "rgba(255,255,255,.1)",
      color: small ? "white" : "white",
      id: 2,
      shadowColor: "rgb(10 10 51 / 10%)",
      margin: small ? "0 0 20px 0" : "0 10px 0 0",
    };
  }, [small]);

  const [overContent, setOverContent] = useState(false);
  const navigage = useNavigate();

  const LandingSignUpHandler = useCallback(() => {
    const landingInput = document.querySelector("input[type='email']");
    const isvalid = validations(landingInput.value, "email");

    if (!isvalid) {
      landingInput.style.color = "red";
      if (landingInput.value === "") {
        setOverContent(true);
      }
    } else {
      landingInput.style.color = "black";
      navigage("/auth/signup");
    }
  }, [navigage]);

  const navigateHandler = useCallback(() => {
    navigage("/auth");
  }, [navigage]);

  return (
    <>
      {overContent && (
        <LandingOverlaySignUp
          setOverContent={setOverContent}
          overContent={overContent}
        />
      )}
      <div
        style={{
          display: "flex",
          placeItems: "center",
          flexDirection: small ? "column" : "row",
          padding: small ? "20px" : "0",
          margin: "0",
          gap: "10px",
        }}
      >
        <MainButton
          buttonData={signUp}
          onClick={LandingSignUpHandler}
          stable={small ? true : false}
        >
          Sign Up
        </MainButton>
        <MainButton
          buttonData={Login}
          onClick={navigateHandler}
          stable={small ? true : false}
        >
          Log In
        </MainButton>
      </div>
    </>
  );
});
