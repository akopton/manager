import { Form } from "../BaseComponents/Form/Form";
import { Input } from "../BaseComponents/Input/Input";
import { Select } from "../BaseComponents/Select/Select";
import { Textarea } from "../BaseComponents/Textarea/Textarea";
import { Button } from "../BaseComponents/Button/Button";
import { FormState, useNoteForm } from "@/hooks/useNoteForm";
import { useEffect, useState } from "react";

type FormData = {
  [key: string]: string;
  title: string;
  text: string;
  listId: string;
};

type FormProps = {
  initialData?: FormData & { id: string };
};

export const AddNoteForm = (props: FormProps) => {
  const [initialFormState, setInitialFormState] = useState<FormState>();
  const { initialData } = props;

  useEffect(() => {
    if (initialData) {
      const { title, text, listId } = initialData;
      const initialFormData = {
        title: { value: title, error: false },
        text: { value: text, error: false },
        listId: { value: listId, error: false },
      };
      setInitialFormState(initialFormData);
    }
  }, [initialData]);

  const { state, handleFieldValue, handleSubmit, selectOptions } =
    useNoteForm(initialFormState);

  return (
    <Form onSubmit={handleSubmit}>
      <Select
        options={selectOptions}
        onChange={(value) => handleFieldValue("listId", value)}
        value={state.listId.value}
        placeholder="Select or search..."
        searchMode
        error={state.listId.error}
      />
      <Input
        type="text"
        onChange={(e) => handleFieldValue("title", e.currentTarget.value)}
        value={state.title.value}
        error={state.title.error}
      />
      <Textarea
        onChange={(e) => handleFieldValue("text", e.currentTarget.value)}
        value={state.text.value}
        error={state.text.error}
      />
      <Button type="submit" text="Zapisz" onClick={handleSubmit} />
    </Form>
  );
};
