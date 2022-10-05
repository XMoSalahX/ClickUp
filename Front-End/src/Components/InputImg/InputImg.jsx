import React from "react";
import styles from "./InpuImg.module.css";

const InputImg = ({ src, alt }) => {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        width: "18px",
        top: "37px",
        left: "10px",
        position: "absolute",
        filter: "contrast(0.2)",
      }}
      className={styles.svgSmallSecreen}
    />
  );
};

export default InputImg;
