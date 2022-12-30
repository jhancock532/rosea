import { ComponentStory, ComponentMeta } from "@storybook/react";
import HomePage from "./HomePage";
import data from "../../../data/pages/index.json";

export default {
  title: "Pages/HomePage",
  component: HomePage,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof HomePage>;

export const Default: ComponentStory<typeof HomePage> = (args) => (
  <HomePage {...args}></HomePage>
);
Default.args = {
  data,
};
