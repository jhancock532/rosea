import { Page } from "../../types/pages";
import Header from "../Header";
import Footer from "../Footer";
import Metadata from "../Metadata";
import styles from "./HomePage.module.scss";

type PageProps = {
  data: Page;
};

const HomePage = ({ data }: PageProps) => {
  return (
    <div className={styles.container}>
      <Metadata
        title={data.metadata.title}
        description={data.metadata.description}
      />
      <Header title={data.settings.siteName} />
      <main className={styles.main}>
        <h1 className={styles.title}>{data.content.title}</h1>
        <p className={styles.description}>{data.content.introduction}</p>
      </main>
      <Footer message="Thanks for visiting." />
    </div>
  );
};

export default HomePage;
