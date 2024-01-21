import { useCallback, useState } from "react";

type TOption = {
  value: string;
  label: string | null;
};

export const useSelect = () => {
  const [value, setValue] = useState<string | null>();
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);

  const close = () => setIsOpen(false);

  const getFilteredOptions = useCallback(
    (options?: TOption[]) => {
      if (value) {
        return options?.filter(
          ({ label }) => label?.toLowerCase().includes(value?.toLowerCase()),
        );
      }

      return options;
    },
    [value],
  );

  const getInitialValue = (initialValue: string, options: TOption[]) => {
    const found = options?.find(({ value }) => value === initialValue);
    setValue(found?.label);
  };

  const search = (value: string) => {
    open();
    setValue(value);
  };

  const select = (
    { value, label }: TOption,
    action: (value: string) => void,
  ) => {
    setValue(label);
    action(value);
    close();
  };

  return {
    select,
    search,
    value,
    getFilteredOptions,
    getInitialValue,
    open,
    close,
    isOpen,
  };
};
