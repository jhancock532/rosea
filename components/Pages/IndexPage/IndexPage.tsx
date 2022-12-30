import { Page, PageLink } from "types/pages";
import Header from "components/Header";
import Footer from "components/Footer";
import Metadata from "components/Metadata";

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
    <div>
      <Metadata
        title={data.metadata.title}
        description={data.metadata.description}
      />
      <Header />
      <main>
        <h1>{data.content.title}</h1>
        <p>{data.content.introduction}</p>
        {indexList}
      </main>
      <Footer />
    </div>
  );
};

export default IndexPage;
