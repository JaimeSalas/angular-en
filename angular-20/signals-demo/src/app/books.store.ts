import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Book } from './book.model';
import { computed, inject, InjectionToken } from '@angular/core';
import { BooksService } from './books.service';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  EMPTY,
  finalize,
  pipe,
  switchMap,
  tap,
} from 'rxjs';

type BookState = {
  books: Book[];
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
};

const initialState: BookState = {
  books: [], // Signal<Book[]>
  isLoading: false, // Signal<Boolean>
  filter: { query: '', order: 'asc' }, // DeepSignal<filter: { query: string; order: 'asc' | 'desc' }> // filter.query - Signal<string>
};

const BOOK_STATE = new InjectionToken<BookState>('BookState', {
  factory: () => ({
    books: [
      //   { id: '1', volumeInfo: { authors: ['Joe Doe'], title: 'Foo' } },
      //   { id: '2', volumeInfo: { authors: ['Joe Doe'], title: 'More Foo' } },
    ],
    isLoading: false,
    filter: { query: '', order: 'asc' },
  }),
});

export const BookStore = signalStore(
  { providedIn: 'root' },
  withState(() => inject(BOOK_STATE)),
  withComputed(({ books, filter }) => ({
    booksCount: computed(() => books().length),
    sortedBooks: computed(() => {
      const direction = filter.order() === 'asc' ? 1 : -1;

      return books().sort(
        (a, b) => direction * a.volumeInfo.title.localeCompare(b.volumeInfo.title)
      );
    }),
  })),
  withMethods((store, booksService = inject(BooksService)) => ({
    updateQuery(query: string): void {
      patchState(store, (state) => ({ filter: { ...state.filter, query } }));
    },

    updateOrder(order: 'asc' | 'desc'): void {
      patchState(store, (state) => ({ filter: { ...state.filter, order } }));
    },
    async loadAll(): Promise<void> {
      patchState(store, { isLoading: true });

      const books = await booksService.getBooksPromise();
      patchState(store, { books, isLoading: false });
    },
    loadByQuery: rxMethod<string>(
      pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true })),
        switchMap((query) => {
          return booksService.getByQuery(query).pipe(
            tap((books) => patchState(store, { books })),
            catchError(() => EMPTY),
            finalize(() => patchState(store, { isLoading: false }))
          );
        })
      )
    ),
  }))
);
