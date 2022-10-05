import styles from "./Home.module.css";
import HomeHeader from "../Home Header/Home_Header";
import Input from "../Input/Input";
import MainButton from "../MainButton/MainButton";
import Imgsgroup from "../imgsGroup/Imgsgroup";
import {
  useRef,
  useEffect,
  useCallback,
  useState,
  useMemo,
  createRef,
  memo,
} from "react";
import { useDispatch } from "react-redux";
import { setvalue } from "../../store/LandingSlice";
import validations from "../../Hooks/Validations";
import LandingOverlaySignUp from "../LandingOverlaySignUp/LandingOverlaySignUp";
import { useNavigate } from "react-router-dom";

const ContentContainer = memo(({ setOverContent }) => {
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

  const dispath = useDispatch();

  // to autoplay after loading
  const videoController = useRef();
  useEffect(() => {
    videoController.current.play();
    dispath(setvalue(""));
  }, [dispath]);

  const navigage = useNavigate();

  const LandingInputRef = createRef();

  const LandingSignUpHandler = useCallback(() => {
    let isvalid;
    if (LandingInputRef.current) {
      isvalid = validations(LandingInputRef.current.value, "email");
    }

    if (!isvalid) {
      if (LandingInputRef.current.value === "") {
        setOverContent(true);
      } else {
        LandingInputRef.current.style.color = "red";
      }
    } else {
      LandingInputRef.current.style.color = "black";
      dispath(setvalue(LandingInputRef.current.value));
      navigage("/auth/signup");
    }
  }, [LandingInputRef, dispath, navigage, setOverContent]);

  const ImgGroupArray = useMemo(() => {
    return [
      {
        id: 1,
        width: "15px",
        height: "15px",
        href: "https://clickup.com/landing/images/icons/rating-star.svg",
        marginRight: "5px",
      },
      {
        id: 2,
        width: "15px",
        height: "15px",
        href: "https://clickup.com/landing/images/icons/rating-star.svg",
        marginRight: "5px",
      },
      {
        id: 3,
        width: "15px",
        height: "15px",
        href: "https://clickup.com/landing/images/icons/rating-star.svg",
        marginRight: "5px",
      },
      {
        id: 4,
        width: "15px",
        height: "15px",
        href: "https://clickup.com/landing/images/icons/rating-star.svg",
        marginRight: "5px",
      },
      {
        id: 5,
        width: "15px",
        height: "15px",
        href: "https://clickup.com/landing/images/icons/rating-star.svg",
        marginRight: "5px",
      },
    ];
  }, []);

  const ratingCompany = useMemo(() => {
    return [
      {
        id: 1,
        width: "77px",
        height: "20px",
        href: "https://clickup.com/landing/images/reviews/color/g2crowd.png",
        marginRight: "15px",
      },
      {
        id: 2,
        width: "77px",
        height: "20px",
        href: "https://clickup.com/landing/images/reviews/color/capterra.png",
        marginRight: "15px",
      },
      {
        id: 3,
        width: "77px",
        height: "20px",
        href: "https://clickup.com/landing/images/reviews/color/getapp.svg",
        marginRight: "15px",
      },
    ];
  }, []);

  const mainCompanies = useMemo(() => {
    return [
      {
        id: 1,
        width: "140px",
        height: "24px",
        href: "https://clickup.com/landing/images/join-companies/samsung.png",
        marginRight: "0",
      },
      {
        id: 2,
        width: "72px",
        height: "24px",
        href: "https://clickup.com/landing/images/join-companies/stanley-security.svg",
        marginRight: "0",
      },
      {
        id: 3,
        width: "140px",
        height: "24px",
        href: "https://clickup.com/landing/images/join-companies/booking-com.svg",
        marginRight: "0",
      },
      {
        id: 4,
        width: "58px",
        height: "24px",
        href: "https://clickup.com/landing/images/join-companies/ibm.svg",
        marginRight: "0",
      },
      {
        id: 5,
        width: "140px",
        height: "24px",
        href: "https://clickup.com/landing/images/join-companies/padres.svg",
        marginRight: "0",
      },
    ];
  }, []);

  return (
    <div className={styles.homeFullWidth}>
      <div className={styles.home_container}>
        <div className={styles.home_content}>
          <div className={styles.landingLeftSide}>
            <h1>
              One app to
              <br /> replace them all.
            </h1>
            <p>
              All of your work in one place: Tasks, Docs, Chat, Goals, & more.
            </p>
            <Input
              ref={LandingInputRef}
              data={{
                type: "email",
                placeholder: "Enter Your Email Adress.",
                ref: "homeEmail",
                id: 1,
              }}
            />
            <div
              style={{ marginTop: "20px" }}
              className={styles.buttonBeforeText}
            >
              <MainButton
                buttonData={buttonData}
                stable={true}
                onClick={LandingSignUpHandler}
                value={"Get Started"}
              />
            </div>
            <div className={styles.rateCotainer}>
              <div className={styles.ratingWithText}>
                <Imgsgroup ImgGroupArray={ImgGroupArray} />
                Based on 10,000+ reviews on
              </div>
              <div className={styles.ratingCompany}>
                <Imgsgroup ImgGroupArray={ratingCompany} />
              </div>
            </div>
          </div>
          <div className={styles.landingRightSide}>
            <video
              className={styles.video}
              ref={videoController}
              id="mutiny-video"
              loop={true}
              muted="muted"
              width="1880"
              height="1224"
              poster="https://clickup.com/videos/mutiny/CLK-109988/header-graphic.min.png"
              playsInline={true}
              autoPlay="autoplay"
            >
              <source
                src="https://clickup.com/videos/mutiny/CLK-109988/header-graphic-v08.mp4"
                type="video/mp4;codecs=hvc1"
              ></source>
              <source
                src="https://clickup.com/videos/mutiny/CLK-109988/header-graphic-v08.webm"
                type="video/webm"
              ></source>
              Sorry, your browser doesn't support videos.
            </video>
          </div>
        </div>
        <div className={styles.mainCompanies}>
          <h2>JOIN 800,000+ HIGHLY PRODUCTIVE TEAMS</h2>
          <div className={styles.mainCompaniesLogos}>
            <Imgsgroup ImgGroupArray={mainCompanies} />
          </div>
        </div>
      </div>
    </div>
  );
});

export default function Home() {
  const [overContent, setOverContent] = useState(false);

  return (
    <>
      <HomeHeader />
      <ContentContainer setOverContent={setOverContent} />
      {overContent && (
        <LandingOverlaySignUp
          setOverContent={setOverContent}
          overContent={overContent}
        />
      )}
    </>
  );
}
