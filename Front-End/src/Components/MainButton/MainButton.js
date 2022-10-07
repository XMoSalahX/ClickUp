import styles from "./MainButton.module.css";
import { useEffect, useRef, memo } from "react";

export default memo(function MainButton({
  buttonData,
  children,
  stable,
  onClick,
  value,
}) {
  const colorContro = useRef();

  // Change auth color depend on the current scroll y offset

  useEffect(() => {
    if (!stable) {
      const background = colorContro.current.style.backgroundColor;
      const color = colorContro.current.style.color;

      window.addEventListener(
        "scroll",
        () => {
          if (colorContro.current !== null) {
            if (window.pageYOffset > 0) {
              colorContro.current.style.backgroundColor = color;

              if (background !== "white") {
                colorContro.current.style.color = "black";
              } else {
                colorContro.current.style.color = background;
              }
            } else {
              colorContro.current.style.color = color;
              colorContro.current.style.backgroundColor = background;
            }
          }
        },
        { once: true }
      );
    }
  });

  return (
    <button
      onClick={onClick}
      ref={colorContro}
      className={stable ? styles.marginStable : styles.marginOnHover}
      style={{
        width: buttonData.width,
        height: buttonData.height,
        borderRadius: "5px",
        border: "none",
        color: buttonData.color,
        backgroundColor: buttonData.backgroundColor,
        margin: buttonData.margin,
        fontWeight: 700,
        boxShadow: `0 10px 25px ${buttonData.shadowColor}`,
      }}
    >
      {value ? value : children}
    </button>
  );
});
