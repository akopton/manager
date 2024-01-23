import { toast } from "react-toastify";
import { useNoteFormReducer } from "./useNoteFormReducer";
import { api } from "@/utils/api";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { mapObjToOption } from "@/utils/mapObjToOption";

type FormErrors = { title: boolean; text: boolean; listId: boolean };
export type FormState = {
  id?: string;
  title: string;
  text: string;
  listId: string;
  sharedWith: string[];
  errors: FormErrors;
};

export const useNoteForm = () => {
  const { data: users } = api.user.getUsers.useQuery();
  const { data: lists } = api.notesList.getLists.useQuery();
  const { mutateAsync: saveNote } = api.notes.saveNote.useMutation();
  const refetchNotes = api.notesList.getLists.useQuery().refetch;
  const userSelectOptions = users?.map(mapObjToOption);
  const listSelectOptions = lists?.map(mapObjToOption);

  const [state, dispatch] = useNoteFormReducer();

  const handleInitialState = (state: FormState) => {
    const { errors, ...rest } = state;
    const fields = Object.keys(rest);
    fields.forEach((field) => {
      type TField = "title" | "text" | "listId" | "sharedWith";
      const value = rest[field as TField];
      if (field === "sharedWith") console.log(value);
      handleFieldValue(field as TField, value);
    });
    if (rest.id) handleFieldValue("id", rest.id);
  };

  const handleFieldError = (field: keyof FormState, value: boolean) =>
    dispatch({ type: "SET_ERROR", payload: { field, value } });

  const handleFieldValue = (
    field: keyof FormState,
    value: string | boolean | string[] | undefined,
  ) => dispatch({ type: "SET_VALUE", payload: { field, value } });

  const validateForm = (data: FormState) => {
    let validatedFields = [];
    const { id, sharedWith, errors, ...rest } = data;
    const formFields = Object.keys(rest);

    formFields.forEach((field) => {
      const value = data[field as keyof FormState];
      if (!value) {
        validatedFields.push(field);
        handleFieldError(field as keyof FormState, true);
        toast.error(`Pole ${field} jest wymagane.`);
      }
    });

    return validatedFields.length < 1;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm(state)) return;

    await toast.promise(saveNote({ ...state }), {
      pending: "Zapisywanie...",
      success: {
        render({ data }) {
          return `Pomyślnie zapisano notatkę ${data?.title}`;
        },
      },
      error: "Wystąpił błąd podczas zapisywania.",
    });

    refetchNotes();
  };

  return {
    handleInitialState,
    handleFieldError,
    handleFieldValue,
    handleSubmit,
    userSelectOptions,
    listSelectOptions,
    state,
  };
};
