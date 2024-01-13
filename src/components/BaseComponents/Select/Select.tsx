import { useEffect, useMemo, useState } from "react";
import styles from "./select.module.css";
import { MdArrowDropDown, MdKeyboardArrowDown } from "react-icons/md";
import { Popup } from "../Popup/Popup";
import { toast, useToast } from "react-toastify";

type TOption = {
  value: string;
  label: string;
};

type SelectProps = {
  options?: TOption[];
  searchMode?: boolean;
  onChange: (value: string) => void;
  value: string;
  placeholder?: string;
  error?: boolean;
};

export const Select = (props: SelectProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectValue, setSelectValue] = useState<string>("");
  const { options, searchMode, onChange, value, placeholder, error } = props;

  useEffect(() => {
    if (!value) setSelectValue("");
    const selectedOption = options?.find((el) => el.value === value);
    if (selectedOption?.label) {
      setSelectValue(selectedOption.label);
    }
  }, [value]);

  const filteredOptions = useMemo(() => {
    if (options?.find((el) => el.label === selectValue)) return options;
    return options?.filter(({ label }) =>
      label.toLowerCase().includes(selectValue?.toLowerCase()),
    );
  }, [selectValue]);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setShowOptions(true);
    setSelectValue(e.currentTarget.value);
  };

  const handleShowOptions = () => {
    setShowOptions((prev) => !prev);
  };

  const handleSelectOption = (option: { value: string; label: string }) => {
    const { value, label } = option;
    onChange(value);
    setSelectValue(label);
    setShowOptions(false);
  };

  const handleBlur = () => {
    if (selectValue && selectValue !== "") {
      const found = options?.find(({ label }) => label === selectValue);
      if (!found) {
        toast.error("Proszę wybrać listę");
      }
    }
  };

  return (
    <div className={styles.select}>
      <div
        className={styles.inputWrapper}
        style={error ? { border: "2px solid var(--light-red)" } : {}}
      >
        <input
          type="text"
          placeholder={placeholder}
          className={styles.input}
          readOnly={!searchMode}
          value={selectValue}
          onChange={handleChange}
        />
        <button
          type="button"
          className={styles.btn}
          onClick={handleShowOptions}
        >
          <MdKeyboardArrowDown />
        </button>
      </div>
      {showOptions && (
        <Popup>
          <ul className={styles.list} onBlur={handleBlur}>
            {filteredOptions && filteredOptions.length < 1 ? (
              <li className={styles.listItemShim}>Brak wyników</li>
            ) : (
              filteredOptions?.map((el) => {
                return (
                  <li
                    onClick={() => handleSelectOption(el)}
                    className={styles.listItem}
                    key={el.value}
                  >
                    {el.label}
                  </li>
                );
              })
            )}
          </ul>
        </Popup>
      )}
    </div>
  );
};
