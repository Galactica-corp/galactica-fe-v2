import { useReducer } from "react";

import shallowEqual from "shallowequal";

const reducer = <State>(state: State, partialState: Partial<State>) => {
  const newState = { ...state, ...partialState };
  if (shallowEqual(state, newState)) return state;

  return newState;
};

export const useStateX = <State>(initialState: State) => {
  return useReducer<typeof reducer<State>>(reducer, initialState);
};
