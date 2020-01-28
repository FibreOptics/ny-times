import React from "react";
import styles from "./SortBar.module.scss";

const SortBar = ({ newestFnc, oldestFnc }) => {
  return (
    <div className={styles.sortBar}>
      <span>Sort by:</span>
      <div onClick={newestFnc} className={styles.sortButton}>
        newest
      </div>
      <div onClick={oldestFnc} className={styles.sortButton}>
        oldest
      </div>
    </div>
  );
};

export default SortBar;
