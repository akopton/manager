import { useState } from "react";

type TOption = {
  value: string;
  label: string;
};

export const useMultiSelect = () => {
  const [selectedOptions, setSelectedOptions] = useState<TOption[]>([]);

  const select = (option: TOption) => {
    setSelectedOptions((prev) => {
      const found = prev.find((el) => el.value === option.value);
      if (found) {
        return prev.filter((opt) => opt.value !== found.value);
      }

      return [...prev, option];
    });
  };

  return { selectedOptions, select };
};
