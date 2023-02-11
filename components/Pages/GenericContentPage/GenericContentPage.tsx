import { Page } from "types/pages";
import Metadata from "components/Metadata";
import styles from "./GenericContentPage.module.scss";

type PageProps = {
  data: Page;
};

const GenericContentPage = ({ data }: PageProps) => {
  return (
    <>
      <Metadata
        title={data.metadata.title}
        description={data.metadata.description}
      />
      <main className={styles.blogContainer}>
        <div className={styles.introduction}>
          <h1 className={styles.title}>{data.content.title}</h1>
          <p className={styles.description}>{data.content.introduction}</p>
        </div>
        <div
          className={styles.richtext}
          dangerouslySetInnerHTML={{ __html: data.content.richtext }}
        />
      </main>
    </>
  );
};

export default GenericContentPage;
