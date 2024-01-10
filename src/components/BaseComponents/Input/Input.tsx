import styles from "./input.module.css";

type InputProps = {
  name?: string;
  type: React.HTMLInputTypeAttribute;
  isReadOnly?: boolean;
  placeholder?: string;
  label?: string;
  value: string;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
  error?: boolean;
};

export const Input = (props: InputProps) => {
  const { name, type, isReadOnly, value, onChange, error } = props;
  return (
    <label htmlFor={name} className={styles.container}>
      <input
        id={name}
        name={name}
        readOnly={isReadOnly}
        type={type}
        className={styles.input}
        value={value}
        onChange={onChange}
        style={error ? { border: "2px solid var(--light-red)" } : {}}
      />
    </label>
  );
};
