import React from "react";
import styles from "./CloseButton.module.css";
import { useRef } from "react";

const CloseButton = ({ setOverContent }) => {
  const closeButton = useRef();

  return (
    <div
      className={styles.CloseButton}
      ref={closeButton}
      onClick={() => setOverContent(false)}
    ></div>
  );
};

export default CloseButton;
