import { TOption } from "../MultiSelect";
import { OptionProps } from "../SelectedOptionsContainer/SelectedOptionsContainer";
import styles from "./container.module.css";

type ContainerProps = {
  options: TOption[];
  isOpen?: boolean;
  onOptionClick: (option: TOption) => void;
  selectedOptions?: TOption[];
};

export const OptionsContainer = (props: ContainerProps) => {
  const { options, isOpen, onOptionClick, selectedOptions } = props;
  const getIsSelected = (value: string) =>
    selectedOptions?.some((option) => value === option.value);

  return (
    <div className={styles.container} style={{ height: isOpen ? "100%" : "0" }}>
      {options && (
        <ul className={styles.list}>
          {options.map((opt) => (
            <Option
              value={opt.value}
              label={opt.label}
              onClick={onOptionClick}
              isSelected={getIsSelected(opt.value)}
              key={opt.value}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

const Option = (props: OptionProps & { isSelected?: boolean }) => {
  const { value, label, isSelected, onClick } = props;
  return (
    <li
      className={styles.listItem}
      onClick={() => onClick({ label, value })}
      style={{ fontWeight: isSelected ? "bold" : "" }}
    >
      <button type="button" className={styles.listItemBtn}>
        {label}
      </button>
    </li>
  );
};
