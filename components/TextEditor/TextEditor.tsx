import { $getRoot, $getSelection } from "lexical";
import { LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import TextEditorToolbar from "../TextEditorToolbar";
import styles from "./TextEditor.module.scss";
import { HeadingNode } from "@lexical/rich-text";

const theme = {
  placeholder: styles.editorPlaceholder,
  paragraph: styles.editorParagraph,
  text: {
    bold: styles.bold,
    italic: styles.italic,
    underline: styles.underline,
    strikethrough: "line-through",
  },
};

function onChange(editorState: any) {
  editorState.read(() => {
    // Read the contents of the EditorState here.
    const root = $getRoot();
    const selection = $getSelection();

    console.log(root, selection);
  });
}

function onError(error: any) {
  console.error(error);
}

export const TextEditor = () => {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
    nodes: [LinkNode, ListItemNode, ListNode, HeadingNode],
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className={styles.editorContainer}>
        <RichTextPlugin
          contentEditable={<ContentEditable className={styles.editorInput} />}
          placeholder={
            <div className={styles.editorPlaceholder}>Enter some text...</div>
          }
        />
        <TextEditorToolbar />
        <OnChangePlugin onChange={onChange} />
        <ListPlugin />
        <LinkPlugin />
        <HistoryPlugin />
      </div>
    </LexicalComposer>
  );
};
