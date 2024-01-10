import styles from "./textarea.module.css";

type TextareaProps = {
  onChange: (e: React.FormEvent<HTMLTextAreaElement>) => void;
  value: string;
  error?: boolean;
};

export const Textarea = (props: TextareaProps) => {
  const { value, onChange, error } = props;
  return (
    <textarea
      value={value}
      onChange={onChange}
      className={styles.textarea}
      style={error ? { border: "2px solid var(--light-red)" } : {}}
    />
  );
};
