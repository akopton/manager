import { CSSProperties } from "react";
import styles from "./textarea.module.css";

type TextareaProps = {
  onChange: (e: React.FormEvent<HTMLTextAreaElement>) => void;
  value: string;
  error?: boolean;
  style?: CSSProperties;
};

export const Textarea = (props: TextareaProps) => {
  const { value, onChange, error, style } = props;
  return (
    <textarea
      value={value}
      onChange={onChange}
      className={styles.textarea}
      style={{
        ...style,
        border: error ? "2px solid var(--light-red)" : style?.border,
      }}
    />
  );
};
