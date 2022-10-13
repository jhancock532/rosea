import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Header } from "./Header";

export default {
  title: "Organisms/Header",
  component: Header,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    title: "Project Rosea",
  },
} as ComponentMeta<typeof Header>;

export const Default: ComponentStory<typeof Header> = (args) => (
  <Header {...args} />
);
