import { useMemo, useState } from "react";
import { Form } from "../BaseComponents/Form/Form";
import { Input } from "../BaseComponents/Input/Input";
import { Select } from "../BaseComponents/Select/Select";
import { Textarea } from "../BaseComponents/Textarea/Textarea";
import { api } from "@/utils/api";
import { Button } from "../BaseComponents/Button/Button";
import { toast } from "react-toastify";

type FormData = {
  title: string;
  text: string;
  listId: string;
};

type FormProps = {
  initialData?: FormData;
};

export const AddNoteForm = (props: FormProps) => {
  const { initialData } = props;
  const [formState, setFormState] = useState<FormData>(
    initialData || {
      title: "",
      text: "",
      listId: "",
    },
  );

  const {
    mutateAsync: addNote,
    isLoading,
    isSuccess,
    isError,
  } = api.notes.addNote.useMutation();

  const { data: lists } = api.notes.getLists.useQuery();

  const selectOptions = useMemo(() => {
    return lists?.map((el) => ({ value: el.id, label: el.name }));
  }, [lists]);

  const handleTitle = (e: React.FormEvent<HTMLInputElement>) => {
    const title = e.currentTarget.value;
    setFormState((prev) => ({ ...prev, title }));
  };

  const handleText = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const text = e.currentTarget.value;
    setFormState((prev) => ({ ...prev, text }));
  };

  const handleListId = (listId: string) => {
    setFormState((prev) => ({ ...prev, listId }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addNote({ ...formState });

    if (isLoading) {
      toast.loading("Adding note...");
    }

    if (isSuccess) {
      toast.success("Added note");
    }

    if (isError) {
      toast.error("There was an error adding a note.");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Select
        options={selectOptions}
        onChange={handleListId}
        value={formState.listId}
      />
      <Input type="text" onChange={handleTitle} value={formState.title} />
      <Textarea onChange={handleText} value={formState.text} />
      <Button type="submit" text="Zapisz" onClick={handleSubmit} />
    </Form>
  );
};
