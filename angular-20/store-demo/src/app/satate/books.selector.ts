import { createSelector, createFeatureSelector } from '@ngrx/store';
import { BookModel } from '../book-list/book.model';

export const selectBooks = createFeatureSelector<ReadonlyArray<BookModel>>('books');

export const selectCollectionState = createFeatureSelector<ReadonlyArray<string>>('collection');

export const selectBookCollection = createSelector(
  selectBooks,
  selectCollectionState,
  (books, collection) => {
    return collection.map((id) => books.find((b) => b.id === id));
    // return [];
  }
);
