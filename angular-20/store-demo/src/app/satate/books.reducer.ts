import { createReducer, on } from '@ngrx/store';

import { BooksApiActions } from './books.actions';
import { BookModel } from '../book-list/book.model';

export const initialState: ReadonlyArray<BookModel> = [];

export const booksReducer = createReducer(
  initialState,
  on(BooksApiActions.retrievedBookList, (_, { books }) => books)
);
