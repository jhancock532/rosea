import React from "react";
import styles from "./LoginScreen.module.scss";

export const LoginScreen = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>Administrator View</h1>
    <p className={styles.notice}>
      This page requires authentication to continue.
    </p>
    <a
      className={styles.loginButton}
      href="https://github-oauth-login.james-hancock6775.workers.dev"
    >
      Login with Github OAuth
    </a>
  </div>
);
