import { TOption } from "../MultiSelect";
import { OptionProps } from "../SelectedOptionsContainer/SelectedOptionsContainer";
import styles from "./container.module.css";

type ContainerProps = {
  options: TOption[];
  isOpen?: boolean;
  onOptionClick: (option: TOption) => void;
};

export const OptionsContainer = (props: ContainerProps) => {
  const { options, isOpen, onOptionClick } = props;
  return (
    <div className={styles.container} style={{ height: isOpen ? "100%" : "0" }}>
      {options && (
        <ul className={styles.list}>
          {options.map((opt) => (
            <Option
              value={opt.value}
              label={opt.label}
              onClick={onOptionClick}
              key={opt.value}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

const Option = (props: OptionProps) => {
  const { value, label, onClick } = props;
  return (
    <li className={styles.listItem} onClick={() => onClick({ label, value })}>
      <button type="button" className={styles.listItemBtn}>
        {label}
      </button>
    </li>
  );
};
