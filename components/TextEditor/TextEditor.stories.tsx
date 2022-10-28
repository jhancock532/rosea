import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TextEditor } from "./TextEditor";

export default {
  title: "Organisms/TextEditor",
  component: TextEditor,
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof TextEditor>;

export const Default: ComponentStory<typeof TextEditor> = (args) => (
  <TextEditor />
);
