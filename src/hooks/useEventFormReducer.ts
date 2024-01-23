import { useReducer } from "react";

type StateErrors = {
  name: boolean;
  date: boolean;
  isCyclic: boolean;
  timePeriod: boolean;
  endAt: boolean;
};

type TState = {
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
  field: string;
  value: string | Date | boolean | number;
};

type TAction = {
  type: ActionType;
  payload: ActionPayload;
};

export const useEventFormReducer = () => {
  const initialState: TState = {
    name: "string",
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
        return { ...state, [payload.field]: payload.value };
      case "SET_ERROR":
      case "INIT":
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return [state, dispatch] as const;
};
