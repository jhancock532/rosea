import type { NextPage } from "next";
import GenericContentPage from "../components/Pages/GenericContentPage";
import data from "../data/pages/index.json";

const Home: NextPage = () => {
  return <GenericContentPage data={data} />;
};

export default Home;
