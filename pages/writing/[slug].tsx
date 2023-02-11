import GenericContentPage from "components/Pages/GenericContentPage";
import fs from "fs";
import { join } from "path";

const POSTS_PATH = join(process.cwd(), "data/pages/writing");

const Post = ({ data }: { data: any }) => {
  return <GenericContentPage data={data} />;
};

// Generate a list of path names from all the .json files in the /data/writing directory.
export const getStaticPaths = async () => {
  const paths = fs
    .readdirSync(POSTS_PATH)
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.json?$/, ""))
    // Map the path into the static paths object
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: {
  params: { slug: string };
}) => {
  // Load the page data from the writing directory
  const postFilePath = join(POSTS_PATH, `${params.slug}.json`);
  const rawPostData = fs.readFileSync(postFilePath, { encoding: "utf8" });

  const data = JSON.parse(rawPostData);

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data }, // will be passed to the page component as props
  };
};

export default Post;
