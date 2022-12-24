import styles from "./PlaintextInput.module.scss";

type PlaintextInputProps = {
  config?: {
    title?: string;
    description?: string;
    format?: "short" | "long";
    maxLength?: number;
  };
  depth?: number;
};

/**
 * Long text format renders with <richtext> with 3 lines of text.
 * Short text format renders on one line only.
 */
export const PlaintextInput = ({ config, depth }: PlaintextInputProps) => {
  const indentationLightness = 100 - (depth ? depth * 5 : 5);
  const backgroundColor = `hsl(0, 0%, ${indentationLightness}%)`;

  return (
    <div
      className={styles.container}
      style={{ backgroundColor: backgroundColor }}
    >
      <div className={styles.row}>
        <p className={styles.title}>{config?.title}</p>
        <input
          className={styles.input}
          type="text"
          maxLength={config?.maxLength}
        ></input>
      </div>
      {config?.description && (
        <p className={styles.description}>{config.description}</p>
      )}
    </div>
  );
};
