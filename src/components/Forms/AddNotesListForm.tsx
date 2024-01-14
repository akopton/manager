import { MdAddCircleOutline } from "react-icons/md";
import { Button } from "../BaseComponents/Button/Button";
import { Form } from "../BaseComponents/Form/Form";
import { Input } from "../BaseComponents/Input/Input";
import { useState } from "react";
import { api } from "@/utils/api";
import { toast } from "react-toastify";

type FormProps = {
  closeForm: () => void;
};

export const AddNotesListForm = (props: FormProps) => {
  const { closeForm } = props;
  const [name, setName] = useState<string>("");
  const { mutateAsync: addList } = api.notes.addList.useMutation();
  const refetchLists = api.notes.getLists.useQuery().refetch;

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

    await toast.promise(addList(name), {
      success: {
        render() {
          return "Pomyślnie dodano listę!";
        },
      },
    });

    await refetchLists();
    closeForm();
  };

  return (
    <Form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Input type="text" value={name} onChange={handleChange} />
      <Button type="submit" text="Dodaj" onClick={handleSubmit} />
    </Form>
  );
};
