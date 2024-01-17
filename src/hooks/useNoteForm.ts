import { toast } from "react-toastify";
import { useFormReducer } from "./useFormReducer";
import { api } from "@/utils/api";
import { useEffect, useMemo } from "react";

export type FormState = {
  title: { value: string; error: boolean };
  text: { value: string; error: boolean };
  listId: { value: string; error: boolean };
};

type InitialFormState = { id: string } & FormState;

export const useNoteForm = (initialData: InitialFormState | undefined) => {
  const [state, dispatch] = useFormReducer();
  const { mutateAsync: saveNote } = api.notes.saveNote.useMutation();
  const refetchNotes = api.notesList.getLists.useQuery().refetch;
  const { data: lists } = api.notesList.getLists.useQuery();
  const { data: usersList } = api.user.getUsers.useQuery();

  const initForm = (data: FormState) => {
    Object.keys(data)
      .filter((key) => key !== "id")
      .forEach((key) => {
        dispatch({
          type: "INIT_FORM",
          payload: {
            field: key as keyof FormState,
            value: data[key as keyof FormState].value,
          },
        });
      });
  };

  useEffect(() => {
    if (initialData) {
      initForm(initialData);
    }
  }, [initialData]);

  const selectOptions = useMemo(() => {
    return lists?.map((el) => ({ value: el.id, label: el.name }));
  }, [lists]);

  const validateForm = (data: FormState) => {
    let validatedFields = [];
    const formFields = Object.keys(data);

    formFields.forEach((field) => {
      if (!data[field as keyof FormState].value) {
        validatedFields.push(field);
        handleFieldError(field as keyof FormState, true);
        toast.error(`Pole ${field} jest wymagane!`);
      }
    });

    return validatedFields.length < 1;
  };

  const resetForm = () => {
    handleFieldValue("title", "");
    handleFieldValue("text", "");
    handleFieldValue("listId", "");
  };

  const handleFieldError = (field: keyof FormState, value: boolean) => {
    dispatch({ type: "SET_FIELD_ERROR", payload: { field, value } });
  };
  const handleFieldValue = (field: keyof FormState, value: string) => {
    handleFieldError(field, false);
    dispatch({ type: "SET_FIELD_VALUE", payload: { field, value } });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm(state)) return;

    const data = {
      id: initialData?.id,
      title: state.title.value,
      text: state.text.value,
      listId: state.listId.value,
    };

    await toast.promise(saveNote({ ...data }), {
      pending: "Zapisywanie...",
      success: {
        render({ data }) {
          return `Pomyślnie zapisano notatkę ${data?.title}`;
        },
      },
      error: "Wystąpił błąd podczas zapisywania.",
    });

    if (!initialData) resetForm();
    refetchNotes();
  };

  const userSelectOptions = useMemo(() => {
    return usersList?.map((user) => ({
      value: user.id,
      label: user.name ?? user.email ?? "",
    }));
  }, [usersList]);

  return {
    state,
    handleFieldValue,
    handleSubmit,
    selectOptions,
    userSelectOptions,
  };
};
