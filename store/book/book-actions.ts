export enum EActionsType {
  SET_BOOKS = "SET_BOOKS",
  SET_BOOK = "SET_BOOK",
}

interface IAddBooksAction {
  type: EActionsType.SET_BOOKS;
  payload: TBook[];
}

export const addBooksAction = (books: TBook[]): IAddBooksAction => ({
  type: EActionsType.SET_BOOKS,
  payload: books,
});

interface IUpdateBookAction {
  type: EActionsType.SET_BOOK;
  payload: Partial<TBook>;
}

export const updateBookAction = (book: Partial<TBook>): IUpdateBookAction => ({
  type: EActionsType.SET_BOOK,
  payload: book,
});

export type UserActionsType = IAddBooksAction | IUpdateBookAction;
