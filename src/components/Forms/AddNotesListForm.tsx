import { Button } from "../BaseComponents/Button/Button";
import { Form } from "../BaseComponents/Form/Form";
import { Input } from "../BaseComponents/Input/Input";
import { useState } from "react";
import { api } from "@/utils/api";
import { toast } from "react-toastify";
import { useNotesLists } from "@/hooks/useNotesLists";

type FormProps = {
  closeForm: () => void;
};

export const AddNotesListForm = (props: FormProps) => {
  const { addNewList } = useNotesLists();
  const { closeForm } = props;
  const [name, setName] = useState<string>("");

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setName(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) {
      toast.error("Proszę podać nazwę listy!");
      return;
    }

    await addNewList(name);

    closeForm();
  };

  return (
    <Form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "10px",
        width: "100%",
      }}
    >
      <Input
        type="text"
        value={name}
        onChange={handleChange}
        style={{ fontSize: "1rem" }}
      />
      <Button type="submit" text="Dodaj" onClick={handleSubmit} />
    </Form>
  );
};
