import React from "react";
import styles from "./GoBack.module.scss";

const GoBack = ({ goBack }) => {
  return (
    <div onClick={() => goBack()} className={styles.goBack}>
      Go back
    </div>
  );
};

export default GoBack;
