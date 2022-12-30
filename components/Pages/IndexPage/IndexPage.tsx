import { Page, PageLink } from "types/pages";
import Header from "components/Header";
import Footer from "components/Footer";
import Metadata from "components/Metadata";
import styles from "../HomePage/Homepage.module.scss";

type PageProps = {
  data: Page;
  pageLinks: PageLink[];
};

export const IndexPage = ({ data, pageLinks }: PageProps) => {
  const indexList = pageLinks.map((page: PageLink, index: number) => (
    <div key={`page-link--${index}`}>
      <a href={page.url}>
        <h2>{page.title}</h2>
        <p>{page.introduction}</p>
      </a>
    </div>
  ));

  return (
    <div className={styles.container}>
      <Metadata
        title={data.metadata.title}
        description={data.metadata.description}
      />
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>{data.content.title}</h1>
        <p className={styles.description}>{data.content.introduction}</p>
        {indexList}
      </main>
      <Footer />
    </div>
  );
};

export default IndexPage;
