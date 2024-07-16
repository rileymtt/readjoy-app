import { Reducer } from "redux";
import * as Actions from "./userActions";

const initialState: TUserInitialState = {
  information: null,
  loading: true,
};

export const userReducer: Reducer<
  TUserInitialState,
  Actions.UserActionsType
> = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case Actions.ActionsType.SET_LOADING:
      return { ...state, loading: payload };
    case Actions.ActionsType.SET_INFORMATION:
      return { ...state, information: payload };
    default:
      return state;
  }
};

export const StoreUserHelper = { Actions };
