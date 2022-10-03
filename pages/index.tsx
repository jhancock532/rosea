import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.scss";
import content from "../data/website.json";
import Header from "../components/Header";

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

      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>{content.title}</h1>

        <p className={styles.description}>{content.description}</p>
      </main>
    </div>
  );
};

export default Home;
