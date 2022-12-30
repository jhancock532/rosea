import type { NextPage } from "next";
import HomePage from "../components/Pages/HomePage";
import data from "../data/pages/index.json";

const Home: NextPage = () => {
  return <HomePage data={data} />;
};

export default Home;
