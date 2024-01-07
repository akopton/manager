import styles from "./button.module.css";

type ButtonProps = {
  type: "button" | "submit" | "reset";
  isDisabled?: boolean;
  text: string;
  onClick: () => void;
};

export const Button = (props: ButtonProps) => {
  const { type, isDisabled, text, onClick } = props;

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={styles.btn}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
