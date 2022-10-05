import styles from "./NavList.module.css";
import { memo } from "react";

export default memo(function NavList({ NavlistData, small }) {
  // Build the navlist from data
  function buildNavlist() {
    const data = NavlistData.map((el) => {
      if (el.child) {
        return (
          <li
            key={el.id}
            className={`${small ? styles.smallItem : styles.itemWithArrow} `}
          >
            <span style={{ paddingRight: "7px" }}>{el.text}</span>
            <span>
              <svg
                width="10"
                height="7"
                viewBox="0 0 10 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L5 5L9 1"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                ></path>
              </svg>
            </span>
          </li>
        );
      }
      return (
        <li
          key={el.id}
          className={`${small ? styles.smallItem : styles.itemWithArrow}`}
        >
          {el.text}
        </li>
      );
    });
    return data;
  }
  return (
    <>
      <ul className={small ? styles.smallList : styles.listStyle}>
        {buildNavlist()}
      </ul>
    </>
  );
});
