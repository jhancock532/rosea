import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TextInput } from "./TextInput";

export default {
  title: "Atoms/TextInput",
  component: TextInput,
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof TextInput>;

export const Default: ComponentStory<typeof TextInput> = (args) => (
  <TextInput {...args}></TextInput>
);
Default.args = {
  label: "Input Label",
};

export const Blue = Default.bind({});
Blue.args = {
  label: "Input Label",
  advice: "Some advice text that describes the text input.",
};
