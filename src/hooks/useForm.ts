import { useFormReducer } from "./useFormReducer";
import { toast } from "react-toastify";
import { showToast } from "@/utils/showToast";
import { ValidationConfig } from "@/components/Forms/AddEventForm";

export type StateErrors = {
  errors: {
    [key: string]: boolean;
  };
};

export type FormState = {
  [key: string]: any;
} & StateErrors;

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
    let validatedFields = [];
    const formFields: string[] = Object.keys(data);

    formFields.forEach((field) => {
      const value = data[field];
      const config = validationConfig[field];

      if (config) {
        const { required, dependsOn } = config;

        if (dependsOn && data[dependsOn]) {
          // Check for required fields based on dependsOn condition
          if (required && !value) {
            validatedFields.push(field);
            handleError(field, true);
            toast.error(`Pole ${field} jest wymagane.`);
          }
        } else {
          // Check for other required fields
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

  return { state, handleValue, onSubmit };
};
