import styles from "./textarea.module.css";

type TextareaProps = {
  onChange: (e: React.FormEvent<HTMLTextAreaElement>) => void;
  value: string;
};

export const Textarea = (props: TextareaProps) => {
  const { value, onChange } = props;
  return <textarea value={value} onChange={onChange} />;
};
