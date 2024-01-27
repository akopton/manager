import { CSSProperties } from "react";
import styles from "./button.module.css";

type DefaultProps = {
  isDisabled?: boolean;
  text?: string;
  icon?: React.ReactNode;
  style?: CSSProperties;
};

type DefaultButton = {
  type: "button" | "reset";
  onClick: () => void;
};

type FormButton = {
  type: "submit";
  onClick: (e: React.FormEvent) => Promise<void> | void;
};

type ButtonProps = DefaultProps & (DefaultButton | FormButton);

export const Button = (props: ButtonProps) => {
  const { type, isDisabled, text, onClick, icon, style } = props;

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={styles.btn}
      onClick={onClick}
      style={style}
    >
      {text && text}
      {icon && icon}
    </button>
  );
};
