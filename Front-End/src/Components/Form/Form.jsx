import styles from "./Form.module.css";
import { memo } from "react";

const Form = ({ children }) => {
  return (
    <form
      style={{
        paddingInline: "40px",
      }}
      className={styles.mobWidth}
    >
      {children}
    </form>
  );
};

export default memo(Form);
