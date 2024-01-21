import { TOption } from "../MultiSelect";
import styles from "./container.module.css";

type ContainerProps = {
  options: TOption[];
  placeholder: string;
  onOptionClick: (option: TOption) => void;
};

export const SelectedOptionsContainer = (props: ContainerProps) => {
  const { options, placeholder, onOptionClick } = props;

  return (
    <div className={styles.container}>
      {options.length < 1 ? (
        <span className={styles.placeholder}>{placeholder}</span>
      ) : (
        <ul className={styles.list}>
          {options?.map((opt) => (
            <SelectedOption {...opt} onClick={onOptionClick} key={opt.value} />
          ))}
        </ul>
      )}
    </div>
  );
};

export type OptionProps = TOption & {
  onClick: (option: TOption) => void;
};

export const SelectedOption = (props: OptionProps) => {
  const { value, label, onClick } = props;
  return (
    <li className={styles.listItem} onClick={() => onClick({ value, label })}>
      <button type="button" className={styles.listItemBtn}>
        <span className={styles.btnLabel}>{label}</span>
        <span className={styles.btnIcon}>X</span>
      </button>
    </li>
  );
};
