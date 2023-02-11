import fs from "fs";
import { join } from "path";
import { Page, PageLink } from "types/pages";
import { IndexPage } from "../components/Pages/IndexPage/IndexPage";
import content from "../data/pages/writing.json";

const WritingIndexPage = ({ pageLinks }: { pageLinks: PageLink[] }) => {
  return <IndexPage data={content} pageLinks={pageLinks} />;
};

export default WritingIndexPage;

const WRITING_POSTS_PATH = join(process.cwd(), "data/pages/writing");

export const getStaticProps = async () => {
  const paths = fs.readdirSync(WRITING_POSTS_PATH);

  const pageLinks = paths.map((path: string) => {
    const fullPostPath = join(WRITING_POSTS_PATH, path);
    const rawPostData = fs.readFileSync(fullPostPath, { encoding: "utf8" });
    const postJSON = JSON.parse(rawPostData) as Page;

    // Todo: update this URL to work with any repo name specified in site settings.
    const postURL = `/rosea/writing/${path.replace(/\.json?$/, "")}`;

    return {
      title: postJSON.content.title,
      introduction: postJSON.content.introduction,
      url: postURL,
    };
  });

  return {
    props: {
      pageLinks,
    },
  };
};
