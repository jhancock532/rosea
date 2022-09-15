import React from "react";
import styles from "./Header.module.scss";

type User = {
  name: string;
};

interface HeaderProps {
  user?: User;
}

export const Header = ({ user }: HeaderProps) => (
  <header>
    <div className={styles.wrapper}>
      <div>
        <h1>Rosea</h1>
      </div>
      <div>
        {user && (
          <>
            <span className={styles.welcome}>
              Welcome, <b>{user.name}</b>!
            </span>
          </>
        )}
      </div>
    </div>
  </header>
);
