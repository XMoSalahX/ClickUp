import { memo } from "react";
import styles from "./HeadAuth.module.css";

const HeadAuth = ({ children }) => {
  return <h1 className={styles.HeadAuth}>{children}</h1>;
};

export default memo(HeadAuth);
