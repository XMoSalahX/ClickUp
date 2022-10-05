import styles from "./AuthMobile.module.css";
import BrandLogo from "../Brand Logo/BrandLogo";
import OverLay from "../OverLay/Overlay";
import NavList from "../NavList/NavList";
import NavAuth from "../NavAuth/NavAuth";

export default function AuthMobile({ SetMobileAuthStatus }) {
  const NavlistData = [
    { text: "Product", child: true, id: 1 },
    { text: "Souluations", child: true, id: 2 },
    { text: "Learn", child: true, id: 3 },
    { text: "Pricing", child: false, id: 4 },
    { text: "Enterprise", child: false, id: 5 },
  ];

  return (
    <>
      <OverLay smallScreen={true} />
      <div className={styles.navMob}>
        <div className={styles.headMob}>
          <BrandLogo />
          <div
            className={styles.closeNavMob}
            onClick={() => SetMobileAuthStatus(false)}
          ></div>
        </div>
        <div className="authMob">
          <NavList NavlistData={NavlistData} small={true} />
          <NavAuth small={true} />
        </div>
      </div>
    </>
  );
}
