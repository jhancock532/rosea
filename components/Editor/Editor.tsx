import styles from "./Editor.module.scss";
import contentTypes from "../../data/contentTypes.json";
import PlaintextInput from "components/PlaintextInput";

type EditorProps = {
  configuration: any;
  setConfiguration?: () => void;
};

/**
 * The editor takes in an object from the contentTypes.json file
 * It then recursively renders that object, and returns the result as JSON
 * Changes in the editor are only saved when setConfiguration is clicked
 */

type RichtextInputProps = {
  config?: {
    title?: string;
    description?: string;
    headings?: "h1" | "h2";
    formatting?: "bold" | "italic" | "strikethrough" | "highlight";
  };
};

const RichtextInput = ({ config }: RichtextInputProps) => {
  return (
    <div className="richtext">
      <p>Todo: integrate the Lexical editor with appropriate context.</p>
      <p>{config?.title}</p>
      <p>{config?.description}</p>
    </div>
  );
};

const RecursiveEditor = ({ configuration }: EditorProps) => {
  const editorOptions = Object.entries(configuration).map(
    ([key, value]: [string, any], index) => {
      switch (value.type) {
        // Ignore the config settings, these are rendered directly in the editor.
        case "config":
          return null;
        case "plaintext":
          return (
            <PlaintextInput
              config={value.config}
              key={`plaintext-input-${index}`}
            />
          );
        case "richtext":
          return (
            <RichtextInput
              config={value.config}
              key={`richtext-input-${index}`}
            />
          );
        default:
          if (value.type === "metadata")
            return (
              <RecursiveEditor
                configuration={contentTypes.compound[value.type as "metadata"]}
                key={`editor-input-${index}`}
              />
            );
      }
      return <p key={index}>{JSON.stringify(value)}</p>;
    }
  );

  return (
    <div className={styles.editor}>
      <details className={styles.editorDetails}>
        <summary className={styles.editorTitle}>
          <strong>{configuration.config.title}</strong>
          <p>{configuration.config.description}</p>
        </summary>
        {editorOptions}
      </details>
    </div>
  );
};

export const Editor = ({ configuration, setConfiguration }: EditorProps) => {
  return (
    <div>
      <h2>An example editor</h2>
      <RecursiveEditor configuration={configuration} />
    </div>
  );
};
