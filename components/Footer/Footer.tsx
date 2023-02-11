import { useSettingsContext } from "context/settings";
import React from "react";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const settings = useSettingsContext();
  return (
    <footer className={styles.container}>
      <div className={styles.message}>
        <p>{settings?.footer.message}</p>
        <p>
          The source code of this site is available{" "}
          <a href="https://github.com/jhancock532/rosea">on Github</a>.
        </p>
      </div>
    </footer>
  );
};
