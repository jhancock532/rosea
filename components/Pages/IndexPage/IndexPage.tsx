import { Page, PageLink } from "types/pages";
import Metadata from "components/Metadata";
import styles from "./IndexPage.module.scss";

type PageProps = {
  data: Page;
  pageLinks: PageLink[];
};

export const IndexPage = ({ data, pageLinks }: PageProps) => {
  const indexList = pageLinks.map((page: PageLink, index: number) => (
    <div className={styles.pageCard} key={`page-link--${index}`}>
      <hr />
      <a href={page.url}>
        <h2 className={styles.pageTitle}>{page.title}</h2>
      </a>
      <p className={styles.pageContent}>{page.introduction}</p>
    </div>
  ));

  return (
    <div>
      <Metadata
        title={data.metadata.title}
        description={data.metadata.description}
      />
      <main className={styles.blogContainer}>
        <div className={styles.introduction}>
          <h1 className={styles.title}>{data.content.title}</h1>
          <p className={styles.description}>{data.content.introduction}</p>
        </div>
        <div className={styles.webpageList}>{indexList}</div>
      </main>
    </div>
  );
};

export default IndexPage;
