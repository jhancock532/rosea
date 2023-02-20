import { useSettingsContext } from "context/settings";
import React from "react";
import Link from "next/link";
import styles from "./Header.module.scss";

export const Header = () => {
  const settings = useSettingsContext();

  return (
    <header className={styles.container}>
      <nav className={styles.navigation}>
        <Link href="/" className={styles.title}>
          {settings?.siteName}
        </Link>
        <Link href="/writing" className={styles.link}>
          Writing
        </Link>
        <Link href="/admin" className={styles.link}>
          Admin
        </Link>
      </nav>
    </header>
  );
};
