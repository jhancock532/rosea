import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TextEditorToolbar } from "./TextEditorToolbar";

export default {
  title: "Molecules/TextEditorToolbar",
  component: TextEditorToolbar,
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof TextEditorToolbar>;

const initialConfig = {
  namespace: "TextEditorToolbar",
  onError: () => false,
};

export const Default: ComponentStory<typeof TextEditorToolbar> = (args) => (
  <div style={{ position: "relative", width: "550px", height: "50px" }}>
    <LexicalComposer initialConfig={initialConfig}>
      <TextEditorToolbar />
    </LexicalComposer>
  </div>
);
