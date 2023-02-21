import Button from "components/Button";
import React from "react";
import styles from "./LoginScreen.module.scss";

export const LoginScreen = () => (
  <div className={styles.container}>
    <p className={styles.notice}>
      This page requires authentication to continue.
    </p>
    <Button
      variant="green"
      url="https://github-oauth-login.james-hancock6775.workers.dev"
    >
      Login with Github OAuth
    </Button>
  </div>
);
