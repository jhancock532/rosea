import { EditorState, LexicalEditor } from "lexical";
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
import { $generateHtmlFromNodes } from "@lexical/html";

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

function handleChange(
  editorState: EditorState,
  editor: LexicalEditor,
  setOutputHTML: any
) {
  editorState.read(() => {
    const htmlString = $generateHtmlFromNodes(editor);

    setOutputHTML(htmlString);
  });
}

function onError(error: any) {
  console.error(error);
}

type TextEditorProps = {
  setOutputHTML?: (html: string) => void;
};

export const TextEditor = ({ setOutputHTML }: TextEditorProps) => {
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
        <OnChangePlugin
          onChange={(editorState: EditorState, editor: LexicalEditor) =>
            handleChange(editorState, editor, setOutputHTML)
          }
        />
        <ListPlugin />
        <LinkPlugin />
        <HistoryPlugin />
      </div>
    </LexicalComposer>
  );
};
