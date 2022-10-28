import React from "react";
import styles from "./TextInput.module.scss";

type TextInputProps = {
  label: string;
  advice?: string;
};

export const TextInput = ({ label, advice }: TextInputProps) => (
  <div className={styles.container}>
    <label className={styles.label}>{label}</label>
    {advice && <p className={styles.advice}>{advice}</p>}
    <input className={styles.input} type="text"></input>
  </div>
);
