import styles from "./Home_Header.module.css";
import BrandLogo from "../Brand Logo/BrandLogo";
import Nav from "../Nav/Nav";
import { useRef, memo } from "react";

export default memo(function HomeHeader() {
  const HeaderColor = useRef();

  // Chang header Background based on window y offset

  window.addEventListener("scroll", function () {
    if (HeaderColor.current !== null) {
      if (window.pageYOffset > 0) {
        HeaderColor.current.style.backgroundColor = "white";
        HeaderColor.current.style.boxShadow = "0 24px 64px rgb(38 33 74 / 10%)";
      } else {
        HeaderColor.current.style.backgroundColor = "transparent";
        HeaderColor.current.style.boxShadow = "none";
      }
    }
  });

  return (
    <div className={styles.headerFullWidth} ref={HeaderColor}>
      <div className={styles.headerContent}>
        <BrandLogo />
        <Nav />
      </div>
    </div>
  );
});
