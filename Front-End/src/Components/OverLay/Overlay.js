import styles from "./Overlay.module.css";

export default function OverLay({ smallScreen }) {
  return <div className={smallScreen ? styles.overlayS : styles.overlay}></div>;
}
