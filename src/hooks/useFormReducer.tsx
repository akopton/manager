import { useReducer } from "react";
import { FormState } from "./useNoteForm";

type TPayload = {
  field: keyof FormState;
  value: string | boolean;
};

type TAction = {
  type: string;
  payload: TPayload;
};

export const useFormReducer = () => {
  const initialFormState: FormState = {
    title: { value: "", error: false },
    text: { value: "", error: false },
    listId: { value: "", error: false },
  };

  const formReducer = (state: FormState, action: TAction) => {
    const { type, payload } = action;
    const { field, value } = payload;
    switch (type) {
      case "SET_FIELD_VALUE":
        return { ...state, [field]: { ...state[field], value } };

      case "SET_FIELD_ERROR":
        return { ...state, [field]: { ...state[field], error: value } };

      case "INIT_FORM":
        return { ...state, [field]: { value, error: false } };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(formReducer, initialFormState);

  return [state, dispatch] as const;
};
