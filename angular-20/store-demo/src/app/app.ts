import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Books as BooksService } from './book-list/books';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectBookCollection, selectBooks } from './satate/books.selector';
import { BooksActions, BooksApiActions } from './satate/books.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css',
})
export class App implements OnInit, OnDestroy { // suffix - component
  private booksService = inject(BooksService);
  private store = inject(Store);
  private sub!: Subscription;

  books$ = this.store.select(selectBooks);
  bookCollection$ = this.store.select(selectBookCollection);

  onAdd(bookId: string) {
    this.store.dispatch(BooksActions.addBook({ bookId }));
  }

  onRemove(bookId: string) {
    this.store.dispatch(BooksActions.removeBook({ bookId }));
  }

  ngOnInit(): void {
    this.sub = this.booksService
      .getBooks()
      .subscribe((books) => this.store.dispatch(BooksApiActions.retrievedBookList({ books })));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
