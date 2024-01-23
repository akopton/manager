import { useReducer } from "react";

export type StateErrors = {
  name: boolean;
  date: boolean;
  isCyclic: boolean;
  timePeriod: boolean;
  endAt: boolean;
};

export type TState = {
  id?: string;
  name: string;
  date: Date;
  isCyclic?: boolean;
  timePeriod?: number;
  endAt?: Date;
  errors: StateErrors;
};

type ActionType = "SET_VALUE" | "SET_ERROR" | "INIT";
type ActionPayload = {
  field: keyof TState;
  value: string | Date | boolean | number;
};

type TAction = {
  type: ActionType;
  payload: ActionPayload;
};

export const useEventFormReducer = () => {
  const initialState: TState = {
    name: "",
    date: new Date(),
    errors: {
      name: false,
      date: false,
      isCyclic: false,
      timePeriod: false,
      endAt: false,
    },
  };

  const reducer = (state: TState, action: TAction) => {
    const { type, payload } = action;
    switch (type) {
      case "SET_VALUE":
        return {
          ...state,
          [payload.field]: payload.value,
          errors: { ...state.errors, [payload.field]: false },
        };
      case "SET_ERROR":
        return {
          ...state,
          errors: { ...state.errors, [payload.field]: payload.value },
        };
      case "INIT":
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return [state, dispatch] as const;
};
