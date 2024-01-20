import { api } from "@/utils/api";
import styles from "./multi.module.css";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useEffect, useState } from "react";
import {
  SelectedOption,
  SelectedOptionsContainer,
} from "./SelectedOptionsContainer/SelectedOptionsContainer";
import { Button } from "../Button/Button";
import { OptionsContainer } from "./OptionsContainer/OptionsContainer";
import { useMultiSelect } from "@/hooks/useMultiSelect";

export type TOption = {
  value: string;
  label: string | null;
};

type SelectProps = {
  options: TOption[];
  onChange: (options: TOption[]) => void;
  placeholder: string;
};

export const MultiSelect = (props: SelectProps) => {
  const { options, placeholder, onChange } = props;
  const { toggleOpen, isOpen, selectedOptions, select, unselect } =
    useMultiSelect();

  useEffect(() => {
    onChange(selectedOptions);
  }, [selectedOptions]);

  return (
    <div className={styles.container}>
      <SelectPlaceholder options={selectedOptions} placeholder={placeholder} />
      <div
        className={styles.main}
        style={{ position: "absolute", top: "0", left: "0" }}
      >
        <div className={styles.valueContainer}>
          <SelectedOptionsContainer
            options={selectedOptions}
            placeholder={placeholder}
            onOptionClick={unselect}
          />
          <Button
            type="button"
            icon={<MdKeyboardArrowDown />}
            onClick={toggleOpen}
            style={{ fontSize: "1.5rem", border: "none", padding: "0" }}
          />
        </div>
        <OptionsContainer
          options={options}
          isOpen={isOpen}
          onOptionClick={select}
        />
      </div>
    </div>
  );
};

type PlaceholderProps = {
  options?: TOption[];
  placeholder: string;
};

const SelectPlaceholder = (props: PlaceholderProps) => {
  const { options, placeholder } = props;
  return (
    <div className={styles.main} style={{ opacity: 0 }}>
      <div className={styles.valueContainer}>
        <div className={styles.selectedOptionsContainer}>
          {!options || options?.length < 1 ? (
            placeholder
          ) : (
            <ul className={styles.selectedOptions}>
              {options?.map((opt) => (
                <SelectedOption {...opt} onClick={() => {}} />
              ))}
            </ul>
          )}
        </div>
        <MdKeyboardArrowDown />
      </div>
    </div>
  );
};
