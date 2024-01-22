import { useReducer } from "react";
import { FormState } from "./useNoteForm";

type ActionPayload = {
  field: keyof FormState;
  value: string | boolean | string[];
};

type ActionType = "SET_VALUE" | "SET_ERROR" | "RESET_VALUES";

type Action = {
  type: ActionType;
  payload: ActionPayload;
};

export const useNoteFormReducer = () => {
  const initialState: FormState = {
    title: "",
    text: "",
    listId: "",
    sharedWith: [],
    errors: { title: false, text: false, listId: false },
  };

  const reducer = (state: FormState, action: Action) => {
    const { type, payload } = action;
    const { field, value } = payload;
    switch (type) {
      case "SET_VALUE":
        return {
          ...state,
          [field]: value,
          errors: { ...state.errors, [field]: false },
        };
      case "SET_ERROR":
        return { ...state, errors: { ...state.errors, [field]: value } };
      case "RESET_VALUES":
        return {
          id: "",
          title: "",
          text: "",
          listId: "",
          sharedWith: [],
          errors: { title: false, text: false, listId: false },
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return [state, dispatch] as const;
};
