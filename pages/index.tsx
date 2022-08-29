import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import homePageContent from "../data/homepage.json";

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
        <h1 className={styles.title}>{homePageContent.title}</h1>

        <p className={styles.description}>{homePageContent.description}</p>
      </main>
    </div>
  );
};

export default Home;
