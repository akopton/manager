import { api } from "@/utils/api";
import { TState, useEventFormReducer } from "./useEventFormReducer";
import { toast } from "react-toastify";
import { showToast } from "@/utils/showToast";

export const useEventForm = () => {
  const { mutateAsync: saveEvent } = api.event.save.useMutation();
  const [state, dispatch] = useEventFormReducer();

  const handleValue = (
    field: keyof TState,
    value: string | number | Date | boolean,
  ) => dispatch({ type: "SET_VALUE", payload: { field, value } });

  const handleError = (field: keyof TState, value: boolean) =>
    dispatch({ type: "SET_ERROR", payload: { field, value } });

  const validateForm = (data: TState) => {
    let validatedFields = [];
    const { id, isCyclic, timePeriod, endAt, errors, ...rest } = data;
    const formFields = Object.keys(rest);

    formFields.forEach((field) => {
      const value = data[field as keyof TState];
      if (!value) {
        validatedFields.push(field);
        handleError(field as keyof TState, true);
        toast.error(`Pole ${field} jest wymagane.`);
      }
    });

    return validatedFields.length < 1;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm(state)) return;

    showToast({
      type: "promise",
      errorMessage: "Wystąpił błąd przy zapisywaniu.",
      successMessage: "Pomyślnie zapisano wydarzenie.",
      pendingMessage: "Zapisywanie...",
      func: async () => await saveEvent({ ...state }),
    });
  };

  return {};
};
