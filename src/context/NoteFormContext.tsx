import { useMultiSelect } from "@/hooks/useMultiSelect";
import { useNoteForm } from "@/hooks/useNoteForm";
import { createContext, useState } from "react";

export const NoteFormContext = createContext({});

export const NoteFormContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {} = useNoteForm();
  const {} = useMultiSelect();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [listId, setListId] = useState("");
  const [sharedWith, setSharedWith] = useState<string[]>([]);

  const handleTitle = () => {};
  const handleText = () => {};
  const handleListId = () => {};
  const handleSharedWithList = () => {};

  const handleSubmit = () => {};

  return (
    <NoteFormContext.Provider value={{}}>{children}</NoteFormContext.Provider>
  );
};
