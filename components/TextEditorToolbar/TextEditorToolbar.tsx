import { FORMAT_ELEMENT_COMMAND, FORMAT_TEXT_COMMAND } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import styles from "./TextEditorToolbar.module.scss";

export const TextEditorToolbar = () => {
  const [editor] = useLexicalComposerContext();

  /* Todo: add icons and state that shows currently active styles.
   * https://stackblitz.com/edit/react-4rxemf?file=src%2FEditor.js
   */

  return (
    <div className={styles.toolbar}>
      <button
        className={styles.button}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        }}
      >
        Bold
      </button>
      <button
        className={styles.button}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        }}
      >
        Italic
      </button>
      <button
        className={styles.button}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
        }}
      >
        Underline
      </button>

      <button
        className={styles.button}
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
        }}
      >
        Left
      </button>
      <button
        className={styles.button}
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
        }}
      >
        Middle
      </button>
      <button
        className={styles.button}
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
        }}
      >
        Right
      </button>
    </div>
  );
};
