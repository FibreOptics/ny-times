import React from "react";
import styles from "./Footer.module.scss";
import logo from "assets/poweredby_nytimes_200a.png";

const Footer = () => {
  return (
    <footer className={`contentbox ${styles.footer}`}>
      <a href='https://developer.nytimes.com'>
        <img src={logo} alt='Data provided by The New York Times' />
      </a>
      <h4>Copyright by Patcharanon W.</h4>
    </footer>
  );
};

export default Footer;
