import { createAction, createActionGroup, props } from '@ngrx/store';
import { BookModel } from '../book-list/book.model';

export const BooksActions = createActionGroup({
  source: 'Books',
  events: {
    'Add book': props<{ bookId: string }>(),
    'Remove book': props<{ bookId: string }>(),
  },
});

export const BooksApiActions = createActionGroup({
  source: 'Books API',
  events: {
    'Retrieved Book List': props<{ books: ReadonlyArray<BookModel> }>(),
  },
});
