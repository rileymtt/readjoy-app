import { Reducer } from "redux";
import * as Actions from "./book-actions";

const initialState: TBookInitialState = {
  myBooks: [],
};

const bookReducer: Reducer<TBookInitialState, Actions.UserActionsType> = (
  state = initialState,
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case Actions.EActionsType.SET_BOOKS:
      return { ...state, myBooks: payload };
    case Actions.EActionsType.SET_BOOK:
      const tempMyBooks = [...state.myBooks];
      let findIndex = tempMyBooks.findIndex((book) => book.id === payload.id);
      tempMyBooks[findIndex] = { ...tempMyBooks[findIndex], ...payload };
      return {
        ...state,
        myBooks: tempMyBooks,
      };
    default:
      return state;
  }
};

export const BookReducerHelper = { Actions, bookReducer };
