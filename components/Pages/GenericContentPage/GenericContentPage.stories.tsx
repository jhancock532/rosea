import { ComponentStory, ComponentMeta } from "@storybook/react";
import GenericContentPage from "./GenericContentPage";
import data from "../../../data/pages/index.json";

export default {
  title: "Pages/GenericContentPage",
  component: GenericContentPage,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof GenericContentPage>;

export const Default: ComponentStory<typeof GenericContentPage> = (args) => (
  <GenericContentPage {...args}></GenericContentPage>
);
Default.args = {
  data,
};
