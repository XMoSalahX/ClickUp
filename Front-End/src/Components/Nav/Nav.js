import NavList from "../NavList/NavList";
import NavAuth from "../NavAuth/NavAuth";
import styles from "./Nav.module.css";
import { useRef, useState, useMemo } from "react";
import AuthMobile from "../AuthMobile/AuthMobile";

export default function Nav() {
  // Data will be sed to nav list
  const NavlistData = useMemo(() => {
    return [
      { text: "Product", child: true, id: 1 },
      { text: "Souluations", child: true, id: 2 },
      { text: "Learn", child: true, id: 3 },
      { text: "Pricing", child: false, id: 4 },
      { text: "Enterprise", child: false, id: 5 },
    ];
  }, []);

  const navControler = useRef();

  const [authMobileStatue, SetMobileAuthStatus] = useState(false);

  //Change Nav button Color
  window.onscroll = (e) => {
    if (window.pageYOffset > 0) {
      if (navControler.current !== null) {
        for (let i = 0; i < navControler.current.childNodes.length; i++) {
          navControler.current.childNodes[i].style.backgroundColor = "black";
        }
      }
    } else {
      if (navControler.current !== null) {
        for (let i = 0; i < navControler.current.childNodes.length; i++) {
          navControler.current.childNodes[i].style.backgroundColor = "white";
        }
      }
    }
  };

  return (
    <>
      <div className={styles.navFlex}>
        <NavList NavlistData={NavlistData} />
        <NavAuth />
      </div>
      <button
        className={styles.navVisabile}
        ref={navControler}
        onClick={() => SetMobileAuthStatus(true)}
      >
        <div></div>
        <div></div>
        <div></div>
      </button>
      {authMobileStatue && (
        <AuthMobile SetMobileAuthStatus={SetMobileAuthStatus} />
      )}
    </>
  );
}
