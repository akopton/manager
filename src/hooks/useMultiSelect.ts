import { TOption } from "@/components/BaseComponents/MultiSelect/MultiSelect";
import { useState } from "react";

export const useMultiSelect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<TOption[]>([]);

  const handleInitialSelected = (
    selectedOptions: string[],
    options: TOption[],
  ) => {
    const newOptions = options.filter((opt) =>
      selectedOptions.includes(opt.value),
    );
    setSelectedOptions(newOptions);
  };

  const select = (option: TOption) =>
    setSelectedOptions((prev) => {
      const found = prev.find((el) => el.value === option.value);
      if (found) {
        return prev.filter((opt) => opt.value !== found.value);
      }

      return [...prev, option];
    });

  const toggleOpen = () => setIsOpen((prev) => !prev);

  return { toggleOpen, isOpen, selectedOptions, select, handleInitialSelected };
};
