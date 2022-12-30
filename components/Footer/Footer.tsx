import { useSettingsContext } from "context/settings";
import React from "react";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const settings = useSettingsContext();
  return (
    <footer className={styles.container}>
      <p className={styles.message}>{settings?.footer.message}</p>
      <p className={styles.message}>
        <a href="https://github.com/jhancock532/rosea">
          Fork this project on Github
        </a>
        .
      </p>
    </footer>
  );
};
