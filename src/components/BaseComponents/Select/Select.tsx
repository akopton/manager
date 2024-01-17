import { useEffect, useMemo, useState } from "react";
import styles from "./select.module.css";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Popup } from "../Popup/Popup";
import { toast } from "react-toastify";
import { Blur } from "../Blur/Blur";
import { useSelect } from "@/hooks/useSelect";
import { useMultiSelect } from "@/hooks/useMultiSelect";

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
  multiSelect?: boolean;
};

export const Select = (props: SelectProps) => {
  const {
    options,
    searchMode,
    onChange,
    value,
    placeholder,
    error,
    multiSelect,
  } = props;

  const {
    select,
    search,
    value: searchValue,
    getFilteredOptions,
    getInitialValue,
    open,
    close,
    isOpen,
  } = useSelect();

  const filteredOptions = getFilteredOptions(options);

  useEffect(() => {
    if (options && value) {
      getInitialValue(value, options);
    }
  }, [options, value]);

  const { selectedOptions, select: selectMultiple } = useMultiSelect();

  const getSelected = (option: TOption) => {
    const found = selectedOptions.find((opt) => opt.value === option.value);
    return found ? true : false;
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
          value={searchValue}
          onChange={(e) => search(e.currentTarget.value)}
        />
        <button type="button" className={styles.btn} onClick={open}>
          <MdKeyboardArrowDown />
        </button>
      </div>
      {isOpen && (
        <>
          <Popup>
            <ul className={styles.list}>
              {filteredOptions && filteredOptions.length < 1 ? (
                <li className={styles.listItemShim}>Brak wyników</li>
              ) : (
                filteredOptions?.map((el) => {
                  if (multiSelect) {
                    return (
                      <CheckboxListItem
                        {...el}
                        onSelect={selectMultiple}
                        selected={getSelected(el)}
                        key={el.value}
                      />
                    );
                  } else {
                    return (
                      <DefaultListItem
                        {...el}
                        onSelect={(opt) => select(opt, onChange)}
                        key={el.value}
                      />
                    );
                  }
                })
              )}
            </ul>
          </Popup>
          <Blur onClick={close} />
        </>
      )}
    </div>
  );
};

type DefaultListItemProps = {
  value: string;
  label: string;
  onSelect: (opt: { value: string; label: string }) => void;
};

const DefaultListItem = (props: DefaultListItemProps) => {
  const { value, label, onSelect } = props;

  return (
    <li
      onClick={() => onSelect({ value, label })}
      className={styles.listItem}
      key={value}
    >
      {label}
    </li>
  );
};

type CheckboxListItemProps = {
  value: string;
  label: string;
  onSelect: (option: TOption) => void;
  selected?: boolean;
};

const CheckboxListItem = (props: CheckboxListItemProps) => {
  const { value, label, onSelect, selected } = props;

  const handleChecked = (e: React.FormEvent<HTMLInputElement>) => {
    onSelect({ value, label });
  };

  return (
    <li>
      <label htmlFor={value}>
        <input
          name={value}
          type="checkbox"
          onChange={handleChecked}
          checked={selected}
        />
        {label}
      </label>
    </li>
  );
};
