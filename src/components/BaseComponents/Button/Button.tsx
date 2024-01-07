import styles from "./button.module.css";

type ButtonProps = {
  type: "button" | "submit" | "reset";
  isDisabled?: boolean;
  text: string;
  icon?: React.ReactNode;
  onClick: () => void;
};

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
