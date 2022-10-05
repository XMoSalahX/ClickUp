import OverLay from "../OverLay/Overlay";
import CloseButton from "../CloseButton/CloseButton";
import styles from "./LandingOverlaySignUp.module.css";
import Input from "../Input/Input";
import MainButton from "../MainButton/MainButton";
import { useDispatch } from "react-redux";
import { setvalue } from "../../store/LandingSlice";
import validations from "../../Hooks/Validations";
import { useNavigate } from "react-router-dom";
import { useMemo, createRef, useCallback } from "react";

const LandingOverlaySignUp = ({ setOverContent, overContent, fromContent }) => {
  const dispath = useDispatch();

  const buttonData = useMemo(() => {
    return {
      width: "40%",
      height: "50px",
      backgroundColor: "#7b68ee",
      color: "white",
      id: 1,
      shadowColor: "rgba(124,104,238,.5)",
      margin: "0px 0 20px 0",
    };
  }, []);

  const LandingInputRef = createRef();

  const navigate = useNavigate();

  const LandingSignUpHandler = useCallback(() => {
    const isvalid = validations(LandingInputRef.current.value, "email");
    if (!isvalid) {
      if (LandingInputRef.current.value === "") {
        setOverContent(true);
      } else {
        LandingInputRef.current.style.color = "red";
      }
    } else {
      LandingInputRef.current.style.color = "black";
      dispath(setvalue(LandingInputRef.current.value));
      navigate("/auth/signup");
    }
  }, [navigate, LandingInputRef, dispath, setOverContent]);

  const btnChild = useMemo(() => "Get ClickUp", []);

  return (
    <>
      {overContent === true && (
        <>
          <OverLay />
          <div className={styles.backGround} style={{ zIndex: 1000 }}>
            <p>
              <b> Sign up for FREE</b>
              <br />
              and start using ClickUp in seconds!
            </p>

            <div className={styles.InputeContainers}>
              <Input
                ref={LandingInputRef}
                data={{
                  type: "email",
                  placeholder: "Enter Your Email Adress.",
                }}
                width={"450px"}
              />
              <div className={styles.button}>
                <MainButton
                  buttonData={buttonData}
                  stable={true}
                  onClick={LandingSignUpHandler}
                >
                  {btnChild}
                </MainButton>
              </div>
            </div>
          </div>
          <CloseButton setOverContent={setOverContent} />
        </>
      )}
    </>
  );
};

export default LandingOverlaySignUp;
