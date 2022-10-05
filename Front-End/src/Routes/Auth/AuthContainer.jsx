import React from "react";
import styles from "./AuthContainer.module.css";
import BrandLogo from "../../Components/Brand Logo/BrandLogo";
import MainButton from "../../Components/MainButton/MainButton.js";
import Imagsgroup from "../../Components/imgsGroup/Imgsgroup";
import { Outlet } from "react-router-dom";

const AuthContainer = ({ children }) => {
  const buttonData = {
    width: "120px",
    height: "40px",
    backgroundColor: "#7b68ee",
    color: "white",
    shadowColor: "rgb(10 10 51 / 10%)",
    margin: "0 0 0 0",
  };

  const mainCompanies = [
    {
      id: 1,
      width: "80px",
      height: "15px",
      href: "https://app-cdn.clickup.com/samsung.108728b84db4ae18.svg",
      marginRight: "0",
    },

    {
      id: 3,
      width: "80px",
      height: "15px",
      href: "https://app-cdn.clickup.com/booking-com.5fad4063445b4672.svg",
      marginRight: "15px",
    },
    {
      id: 4,
      width: "40px",
      height: "15px",
      href: "https://app-cdn.clickup.com/ibm.a46ba77b5d0c065a.svg",
      marginRight: "15px",
    },
    {
      id: 5,
      width: "40px",
      height: "15px",
      href: "https://app-cdn.clickup.com/padres.fdacd062f4001223.svg",
      marginRight: "15pxs",
    },
  ];

  return (
    <div className={styles.fromContainer}>
      <div className={styles.header}>
        <BrandLogo />
        <div className={styles.developerInformation}>
          <div>Do You Know Mohammed Salah!</div>
          <MainButton
            buttonData={buttonData}
            stable={true}
            onClick={() => {
              window.open("https://www.linkedin.com/in/xmosalahx/", "_blank");
            }}
          >
            Find out now
          </MainButton>
        </div>
      </div>
      <div className={styles.backgroundContainer}></div>
      <div className={styles.contentContainer}>
        <div className={styles.dataContanier}>
          {children}
          <Outlet />
          <div className={styles.contentFooter}>
            By clicking the button above, you agree to our
            <a
              href="http://clickup.com/terms"
              rel="noopener noreferrer"
              target={"_blank"}
            >
              Terms of Service
            </a>
            and
            <a
              href="http://clickup.com/privacy"
              rel="noopener noreferrer"
              target="_blank"
              className="cu-onboarding__footnote-link cu-onboarding__footnote-link_last"
            >
              Privacy Policy
            </a>
          </div>
          <div className={styles.help}>
            <svg
              className={styles.svgHelp}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 6a6 6 0 016-6h4a6 6 0 016 6v4a6 6 0 01-6 6H6a6 6 0 01-6-6V6zm2 0a4 4 0 014-4h4a4 4 0 014 4v4a4 4 0 01-4 4H6a4 4 0 01-4-4V6zm5.117-.483c-.12.25-.34.483-.617.483H6c-.552 0-1.016-.46-.836-.982A3.001 3.001 0 0111 6c0 1.126-.62 1.863-1.538 2.308C9.192 8.44 9 8.7 9 9a1 1 0 01-2 0v-.5c0-.828.724-1.313 1.482-1.647C8.787 6.72 9 6.467 9 6a1 1 0 00-1-1c-.512 0-.761.262-.883.517zM8 13a1 1 0 100-2 1 1 0 000 2z"
                fill="#fff"
              ></path>
            </svg>
            <div>Help</div>
          </div>
        </div>
        <div className={styles.imgGroup}>
          <Imagsgroup ImgGroupArray={mainCompanies} />
        </div>
        <div className={styles.seeWhy}>
          See why 800,000+ teams are more productive with ClickUp
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
