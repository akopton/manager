import { useFormReducer } from "./useFormReducer";
import { toast } from "react-toastify";
import { showToast } from "@/utils/showToast";

export type StateErrors = {
  errors: Record<string, boolean>;
};

export type FormState = Record<string, any> & StateErrors;

export type ValidationConfig<T> = {
  [key in keyof T]?: {
    required?: boolean;
    dependsOn?: keyof T;
  };
};

export const useForm = <T extends FormState>(initialState: T) => {
  const [state, dispatch] = useFormReducer<T>(initialState);

  const handleValue = (field: keyof T, value: any) =>
    dispatch({ type: "SET_VALUE", payload: { field, value } });

  const handleError = (field: keyof T, value: boolean) =>
    dispatch({ type: "SET_ERROR", payload: { field, value } });

  const validateForm = <T extends FormState>(
    data: T,
    validationConfig: ValidationConfig<T>,
  ) => {
    const validatedFields = [];
    const formFields: string[] = Object.keys(data);

    formFields.forEach((field) => {
      const value = data[field];
      const config = validationConfig[field];

      if (config) {
        const { required, dependsOn } = config;

        if (dependsOn && data[dependsOn]) {
          if (required && !value) {
            validatedFields.push(field);
            handleError(field, true);
            toast.error(`Pole ${field} jest wymagane.`);
          }
        } else {
          if (required && !value && !dependsOn) {
            validatedFields.push(field);
            handleError(field, true);
            toast.error(`Pole ${field} jest wymagane.`);
          }
        }
      }
    });

    return validatedFields.length < 1;
  };

  const onSubmit = async (
    e: React.FormEvent,
    func: () => Promise<void>,
    validationConfig: ValidationConfig<T>,
  ) => {
    e.preventDefault();

    if (!validateForm(state, validationConfig)) return;

    showToast({
      type: "promise",
      errorMessage: "Wystąpił błąd przy zapisywaniu.",
      successMessage: "Pomyślnie zapisano.",
      pendingMessage: "Zapisywanie...",
      func: async () => await func(),
    });
  };

  const handleInitialData = (data: Omit<T, "errors">) => {
    const fields = Object.keys(data);
    fields.forEach((field) => handleValue(field, data[field]));
  };

  return { state, handleValue, onSubmit, handleInitialData };
};
