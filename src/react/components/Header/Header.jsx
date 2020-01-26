import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import logo from "assets/poweredby_nytimes_30a.png";

const Header = () => {
  return (
    <header className={`contentbox ${styles.header}`}>
      <Link to='/'>
        <img src={logo} alt='Logo' />
        <h2>New York Times Articles</h2>
      </Link>
    </header>
  );
};

export default Header;
