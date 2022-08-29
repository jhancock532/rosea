import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Admin.module.css";

const Admin: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Admin</title>
        <meta
          name="description"
          content="A website integrated with the GitHub API."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Administrator View</h1>

        <p className={styles.description}>
          This page requires authentication to continue.
        </p>
      </main>

      <footer className={styles.footer}>
        Powered by GitHub and Cloudflare
      </footer>
    </div>
  );
};

export default Admin;
