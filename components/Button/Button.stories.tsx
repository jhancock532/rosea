import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button } from "./Button";

export default {
  title: "Atoms/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    hue: { control: { type: "range", min: 0, max: 360, step: 15 } },
    children: {
      name: "Button contents",
    },
    className: {
      control: false,
    },
    type: {
      control: false,
    },
    onClick: {
      control: false,
    },
    internalLink: {
      control: false,
    },
    url: {
      control: false,
    },
  },
} as ComponentMeta<typeof Button>;

export const Default: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>{args.children}</Button>
);
Default.args = {
  children: "Default button",
};

export const Blue = Default.bind({});
Blue.args = {
  variant: "blue",
  children: "Blue button",
};

export const Red = Default.bind({});
Red.args = {
  variant: "red",
  children: "Red button",
};

export const Custom = Default.bind({});
Custom.args = {
  variant: "custom",
  children: "Custom button",
  hue: 300,
};
