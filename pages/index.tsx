import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Project Rosea</title>
        <meta
          name="description"
          content="A website integrated with the GitHub API."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Project Rosea</h1>

        <p className={styles.description}>A demonstration app.</p>
      </main>

      <footer className={styles.footer}>
        Powered by GitHub and Cloudflare
      </footer>
    </div>
  );
};

export default Home;
