import { TOption } from "@/components/BaseComponents/MultiSelect/MultiSelect";
import { useState } from "react";

export const useSelect = () => {
  const [selected, setSelected] = useState<TOption>();
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const toggleOpen = () => setIsOpen((prev) => !prev);

  const select = (opt: TOption) =>
    setSelected((prev) => (opt.value === prev?.value ? undefined : opt));

  return { selected, select, toggleOpen, isOpen };
};
