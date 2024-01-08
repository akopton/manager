import styles from "./input.module.css";

type InputProps = {
  name?: string;
  type: React.HTMLInputTypeAttribute;
  isReadOnly?: boolean;
  placeholder?: string;
  label?: string;
  value: string;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
};

export const Input = (props: InputProps) => {
  const { name, type, isReadOnly, value, onChange } = props;
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
      />
    </label>
  );
};
