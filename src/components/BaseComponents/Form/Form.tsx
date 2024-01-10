import { CSSProperties } from "react";
import styles from "./form.module.css";

type FormProps = {
  children?: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  style?: CSSProperties;
};

export const Form = (props: FormProps) => {
  const { children, onSubmit, style } = props;
  return (
    <form className={styles.form} onSubmit={onSubmit} style={style}>
      {children}
    </form>
  );
};
