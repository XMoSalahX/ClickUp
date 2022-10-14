import styles from "./Loading.module.css";

function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.londingContent}>
        <div className={styles.lodingLogo}>
          <div className={styles.waveIcon}></div>
          <img
            className={styles.waveAnimation}
            src="https://app-cdn.clickup.com/assets/images/loading/wave.gif"
            alt="wave-animations"
          />
        </div>
      </div>
    </div>
  );
}

export default Loading;
