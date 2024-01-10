import { toast } from "react-toastify";
import { useFormReducer } from "./useFormReducer";
import { api } from "@/utils/api";
import { useMemo } from "react";

export type FormState = {
  [key: string]: { value: string; error: boolean };
  title: { value: string; error: boolean };
  text: { value: string; error: boolean };
  listId: { value: string; error: boolean };
};

export const useNoteForm = () => {
  const [state, dispatch] = useFormReducer();
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

  const setFieldError = (field: string, value: boolean) =>
    dispatch({
      type: `SET_${field.toUpperCase()}`,
      payload: { property: "error", value },
    });

  const validateForm = (data: FormState) => {
    let validatedFields = [];
    const formFields = Object.keys(data);

    formFields.forEach((field) => {
      if (!data[field]?.value) {
        validatedFields.push(field);
        setFieldError(field, true);
      }
    });

    return validatedFields.length < 1;
  };

  const handleTitle = (e: React.FormEvent<HTMLInputElement>) => {
    const title = e.currentTarget.value;
    setFieldError("title", false);
    dispatch({
      type: "SET_TITLE",
      payload: { property: "value", value: title },
    });
  };

  const handleText = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const text = e.currentTarget.value;
    setFieldError("text", false);
    dispatch({
      type: "SET_TEXT",
      payload: { property: "value", value: text },
    });
  };

  const handleListId = (listId: string) => {
    setFieldError("listId", false);
    dispatch({
      type: "SET_LISTID",
      payload: { property: "value", value: listId },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm(state)) return;

    const data = {
      title: state.title.value,
      text: state.text.value,
      listId: state.listId.value,
    };

    await toast.promise(addNote({ ...data }), {
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

  return {
    state,
    handleTitle,
    handleText,
    handleListId,
    handleSubmit,
    selectOptions,
  };
};
