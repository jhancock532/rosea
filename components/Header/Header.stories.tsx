import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Header } from "./Header";

export default {
  title: "Organisms/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      values: [{ name: "white", value: "#fff" }],
    },
  },
  args: {
    title: "Project Rosea",
  },
  argTypes: {
    title: {
      name: "Title",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "3em" }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Header>;

export const Default: ComponentStory<typeof Header> = (args) => (
  <Header {...args} />
);
