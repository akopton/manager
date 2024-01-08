import { useMemo } from "react";
import styles from "./select.module.css";

type TOption = {
  value: string;
  label: string;
};

type SelectProps = {
  options?: TOption[];
  searchMode?: boolean;
  onChange: (value: string) => void;
  value: string;
};

export const Select = (props: SelectProps) => {
  const { options, searchMode, onChange, value } = props;

  const selectValue = useMemo(() => {
    const selectedOption = options?.find((el) => el.value === value);
    return selectedOption?.label;
  }, [value]);

  return (
    <div className={styles.select}>
      <input
        type="text"
        className={styles.input}
        readOnly={!searchMode}
        value={selectValue}
      />
      <ul className={styles.list}>
        {options?.map((el) => {
          return <li onClick={() => onChange(el.value)}>{el.label}</li>;
        })}
      </ul>
    </div>
  );
};
