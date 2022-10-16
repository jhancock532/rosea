import React from "react";
import styles from "./Header.module.scss";

type HeaderProps = {
  title: string;
};

export const Header = ({ title }: HeaderProps) => (
  <header className={styles.container}>
    <p className={styles.title}>{title}</p>
    {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
    <a href="/rosea/admin" className={styles.adminLink}>
      Admin
    </a>
  </header>
);
