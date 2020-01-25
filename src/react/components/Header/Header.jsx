import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={`contentbox ${styles.header}`}>
      <h3>Logo</h3>
      <nav>
        <Link to='/'>Homepage</Link>
      </nav>
    </header>
  );
};

export default Header;
