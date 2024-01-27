import { useEffect, useState } from "react";
import { TOption } from "../MultiSelect/MultiSelect";
import { useSelect } from "@/hooks/useSelect";
import styles from "./select.module.css";
import { Button } from "../Button/Button";
import { MdKeyboardArrowDown } from "react-icons/md";

type SelectProps = {
  options: TOption[];
  value?: string;
  onChange: (opt: TOption | undefined) => void;
};

export const Select = (props: SelectProps) => {
  const { selected, select, isOpen, toggleOpen } = useSelect();
  const { options, value, onChange } = props;

  useEffect(() => {
    if (!selected && options) {
      const option = options.find((opt) => opt.value === value);
      if (option) select(option);
    }
  }, [options]);

  useEffect(() => {
    onChange(selected);
  }, [selected]);

  return (
    <div className={styles.select}>
      <div className={styles.main}>
        <div className={styles.selectValueContainer}>
          <SelectedValue value={selected?.label ?? ""} />
          <Button
            onClick={toggleOpen}
            type="button"
            icon={<MdKeyboardArrowDown />}
            style={{ fontSize: "1.5rem", border: "none", padding: "0" }}
          />
        </div>
        {isOpen && (
          <OptionsList
            options={options}
            onSelect={select}
            selectedOption={selected}
          />
        )}
      </div>
    </div>
  );
};

// ----- //
type ValueContainerProps = {
  value: string;
};
const SelectedValue = (props: ValueContainerProps) => {
  const { value } = props;
  return (
    <input
      type="text"
      value={value}
      className={styles.selectValue}
      placeholder="Select an option..."
      readOnly
    />
  );
};
// ----- //

// ----- //
type ListProps = {
  options: TOption[];
  selectedOption?: TOption;
  onSelect: (opt: TOption) => void;
};

const OptionsList = (props: ListProps) => {
  const { options, selectedOption, onSelect } = props;
  return (
    <ul className={styles.selectList}>
      {options.map((opt) =>
        opt.value === selectedOption?.value ? (
          <SelectedOption
            label={opt.label}
            onClick={() => onSelect(opt)}
            key={opt.value}
          />
        ) : (
          <DefaultOption
            label={opt.label}
            onClick={() => onSelect(opt)}
            key={opt.value}
          />
        ),
      )}
    </ul>
  );
};
// ----- //

const DefaultOption = (props: {
  label: string | null;
  onClick: () => void;
}) => {
  const { label, onClick } = props;
  return (
    <li onClick={onClick} className={styles.listItem}>
      {label}
    </li>
  );
};

const SelectedOption = (props: {
  label: string | null;
  onClick: () => void;
}) => {
  const { label, onClick } = props;
  return (
    <li
      onClick={onClick}
      className={styles.listItem}
      style={{ fontWeight: "bold" }}
    >
      {label}
    </li>
  );
};

// ----- //
const SelectValuePlaceholder = () => {
  return (
    <div className={styles.main} style={{ opacity: "0" }}>
      <div className={styles.selectValueContainer}>
        <SelectedValue value="" />
        <Button
          isDisabled
          onClick={() => {
            return null;
          }}
          type="button"
          icon={<MdKeyboardArrowDown />}
          style={{ border: "none" }}
        />
      </div>
    </div>
  );
};
