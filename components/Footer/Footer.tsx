import React from "react";
import styles from "./Footer.module.scss";

type FooterProps = {
  message: string;
};

export const Footer = ({ message }: FooterProps) => (
  <footer className={styles.container}>
    <p className={styles.message}>{message}</p>
    <p className={styles.message}>
      <a href="https://github.com/jhancock532/rosea">
        Fork this project on Github
      </a>
      .
    </p>
  </footer>
);
