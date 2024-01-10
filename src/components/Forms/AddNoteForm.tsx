import { useMemo, useState } from "react";
import { Form } from "../BaseComponents/Form/Form";
import { Input } from "../BaseComponents/Input/Input";
import { Select } from "../BaseComponents/Select/Select";
import { Textarea } from "../BaseComponents/Textarea/Textarea";
import { api } from "@/utils/api";
import { Button } from "../BaseComponents/Button/Button";
import { toast } from "react-toastify";

type FormData = Record<string, string> & {
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

  const [errors, setErrors] = useState({
    title: false,
    text: false,
    listId: false,
  });

  const {
    mutateAsync: addNote,
    isLoading,
    isSuccess,
    isError,
  } = api.notes.addNote.useMutation();

  const refetchNotes = api.notes.getLists.useQuery().refetch;

  const { data: lists } = api.notes.getLists.useQuery();

  const selectOptions = useMemo(() => {
    return lists?.map((el) => ({ value: el.id, label: el.name }));
  }, [lists]);

  const handleTitle = (e: React.FormEvent<HTMLInputElement>) => {
    const title = e.currentTarget.value;
    setErrors((prev) => ({ ...prev, title: false }));
    setFormState((prev) => ({ ...prev, title }));
  };

  const handleText = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const text = e.currentTarget.value;
    setErrors((prev) => ({ ...prev, text: false }));
    setFormState((prev) => ({ ...prev, text }));
  };

  const handleListId = (listId: string) => {
    setErrors((prev) => ({ ...prev, listId: false }));
    setFormState((prev) => ({ ...prev, listId }));
  };

  const validateForm = (data: FormData) => {
    let validatedFields = [];
    const formFields = Object.keys(data);

    formFields.forEach((field) => {
      if (!data[field]) {
        toast.error(`Pole ${field} jest wymagane`);
        setErrors((prev) => ({ ...prev, [field]: true }));
        validatedFields.push(field);
      }
    });

    return validatedFields.length < 1;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm(formState)) return;

    await toast.promise(addNote({ ...formState }), {
      pending: "Zapisywanie...",
      success: {
        render({ data }) {
          return `Pomyślnie dodano notatkę ${data?.title}`;
        },
      },
      error: "Wystąpił błąd w dodawaniu.",
    });

    refetchNotes();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Select
        options={selectOptions}
        onChange={handleListId}
        value={formState.listId}
        placeholder="Select or search..."
        searchMode
        error={errors.listId}
      />
      <Input
        type="text"
        onChange={handleTitle}
        value={formState.title}
        error={errors.title}
      />
      <Textarea
        onChange={handleText}
        value={formState.text}
        error={errors.text}
      />
      <Button type="submit" text="Zapisz" onClick={handleSubmit} />
    </Form>
  );
};
