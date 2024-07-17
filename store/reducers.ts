import { combineReducers } from "redux";
import { BookReducerHelper } from "./book/book-reducer";
import { userReducer } from "./user/userReducer";

export const rootReducer = combineReducers({
  userReducer,
  bookReducer: BookReducerHelper.bookReducer,
});
