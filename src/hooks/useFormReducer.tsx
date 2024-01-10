import { useReducer } from "react";
import { FormState } from "./useNoteForm";

type TAction = {
  type: string;
  payload: { property: string; value: string | boolean };
};

export const useFormReducer = () => {
  const initialFormState: FormState = {
    title: { value: "", error: false },
    text: { value: "", error: false },
    listId: { value: "", error: false },
  };

  const formReducer = (state: FormState, action: TAction) => {
    const { type, payload } = action;
    switch (type) {
      case "SET_TITLE":
        return {
          ...state,
          title: { ...state.title, [payload.property]: payload.value },
        };

      case "SET_TEXT":
        return {
          ...state,
          text: { ...state.text, [payload.property]: payload.value },
        };

      case "SET_LISTID":
        return {
          ...state,
          listId: { ...state.listId, [payload.property]: payload.value },
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(formReducer, initialFormState);

  return [state, dispatch] as const;
};
