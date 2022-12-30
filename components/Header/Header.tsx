import { useSettingsContext } from "context/settings";
import React from "react";
import styles from "./Header.module.scss";

export const Header = () => {
  const settings = useSettingsContext();

  return (
    <header className={styles.container}>
      <p className={styles.title}>{settings?.siteName}</p>
      <a href="/rosea/writing" className={styles.adminLink}>
        Writing
      </a>
      <a href="/rosea/admin" className={styles.adminLink}>
        Admin
      </a>
    </header>
  );
};
