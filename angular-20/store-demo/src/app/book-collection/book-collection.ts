import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookModel } from '../book-list/book.model';

@Component({
  selector: 'app-book-collection',
  standalone: false,
  templateUrl: './book-collection.html',
  styles: ``,
})
export class BookCollection {
  @Input() books: ReadonlyArray<BookModel | undefined> = [];
  @Output() remove = new EventEmitter<string>();
}
