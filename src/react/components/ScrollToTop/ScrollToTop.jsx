import React, { useState } from "react";
import styles from "./ScrollToTop.module.scss";
import { ReactComponent as UpArrow } from "assets/arrowup.svg";

const ScrollToTop = () => {
  const [YOffset, setYOffset] = useState(window.scrollY);
  const scrollUp = () => {
    window.scrollTo(0, 0);
  };
  window.addEventListener("scroll", event => {
    setYOffset(window.scrollY);
    //console.log(window.scrollY);
  });
  return (
    <div
      className={styles.scroll}
      onClick={scrollUp}
      style={YOffset < 20 ? { display: "none" } : { display: "flex" }}
    >
      <UpArrow />
    </div>
  );
};

export default ScrollToTop;
