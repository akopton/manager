import { useMemo, useState } from "react";
import { Form } from "../BaseComponents/Form/Form";
import { Input } from "../BaseComponents/Input/Input";
import { Select } from "../BaseComponents/Select/Select";
import { Textarea } from "../BaseComponents/Textarea/Textarea";
import { api } from "@/utils/api";
import { Button } from "../BaseComponents/Button/Button";

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

  const { data: lists } = api.notes.getLists.useQuery();

  const selectOptions = useMemo(() => {
    return lists?.map((el) => ({ value: el.id, label: el.name }));
  }, [lists]);

  const handleTitle = () => {};
  const handleText = () => {};
  const handleListId = (id: string) => {
    setFormState((prev) => ({ ...prev, listId: id }));
  };

  const handleSubmit = () => {};

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
