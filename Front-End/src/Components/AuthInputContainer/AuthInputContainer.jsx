import React from "react";
import styles from "./AuthInputContainer.module.css";

const AuthInputContainer = ({ children }) => {
  return <div className={styles.inputContainer}>{children}</div>;
};

export default AuthInputContainer;
