import styles from "./form.module.css";

type FormProps = {
  children?: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
};

export const Form = (props: FormProps) => {
  const { children, onSubmit } = props;
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {children}
    </form>
  );
};
