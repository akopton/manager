import { Form } from "../BaseComponents/Form/Form";
import { Input } from "../BaseComponents/Input/Input";
import { Select } from "../BaseComponents/Select/Select";
import { Textarea } from "../BaseComponents/Textarea/Textarea";
import { Button } from "../BaseComponents/Button/Button";
import { useNoteForm } from "@/hooks/useNoteForm";

type FormData = Record<string, string> & {
  title: string;
  text: string;
  listId: string;
};

type FormProps = {
  initialData?: FormData;
};

export const AddNoteForm = (props: FormProps) => {
  // const { initialData } = props;

  const {
    state,
    handleTitle,
    handleText,
    handleListId,
    handleSubmit,
    selectOptions,
  } = useNoteForm();

  return (
    <Form onSubmit={handleSubmit}>
      <Select
        options={selectOptions}
        onChange={handleListId}
        value={state.listId.value}
        placeholder="Select or search..."
        searchMode
        error={state.listId.error}
      />
      <Input
        type="text"
        onChange={handleTitle}
        value={state.title.value}
        error={state.title.error}
      />
      <Textarea
        onChange={handleText}
        value={state.text.value}
        error={state.text.error}
      />
      <Button type="submit" text="Zapisz" onClick={handleSubmit} />
    </Form>
  );
};
