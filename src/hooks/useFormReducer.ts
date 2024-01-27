import { useReducer } from "react";
import { StateErrors } from "./useForm";

type ActionType = "SET_VALUE" | "SET_ERROR" | "INIT";
type ActionPayload<T> = {
  field: keyof T;
  value: any;
};

type TAction<T> = {
  type: ActionType;
  payload: ActionPayload<T>;
};

export const useFormReducer = <T extends StateErrors>(initialState: T) => {
  const reducer = (state: T, action: TAction<T>) => {
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

// export const useEventFormReducer = () => {
//   const initialState: TState = {
//     name: "",
//     date: new Date(),
//     errors: {
//       name: false,
//       date: false,
//       isCyclic: false,
//       timePeriod: false,
//       endAt: false,
//     },
//   };

//   const reducer = (state: TState, action: TAction) => {
//     const { type, payload } = action;
//     switch (type) {
//       case "SET_VALUE":
//         return {
//           ...state,
//           [payload.field]: payload.value,
//           errors: { ...state.errors, [payload.field]: false },
//         };
//       case "SET_ERROR":
//         return {
//           ...state,
//           errors: { ...state.errors, [payload.field]: payload.value },
//         };
//       case "INIT":
//       default:
//         return state;
//     }
//   };

//   const [state, dispatch] = useReducer(reducer, initialState);

//   return [state, dispatch] as const;
// };
