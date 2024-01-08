import styles from "./button.module.css";

type DefaultProps = {
  isDisabled?: boolean;
  text: string;
  icon?: React.ReactNode;
};

type DefaultButton = {
  type: "button" | "reset";
  onClick: () => void;
};

type FormButton = {
  type: "submit";
  onClick: (e: React.FormEvent) => Promise<void>;
};

type ButtonProps = DefaultProps & (DefaultButton | FormButton);

export const Button = (props: ButtonProps) => {
  const { type, isDisabled, text, onClick, icon } = props;

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={styles.btn}
      onClick={onClick}
    >
      {text}
      {icon && icon}
    </button>
  );
};
