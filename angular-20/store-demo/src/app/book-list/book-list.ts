import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookModel } from './book.model';

@Component({
  selector: 'app-book-list',
  standalone: false,
  templateUrl: './book-list.html',
  styles: ``,
})
export class BookList {
  @Input() books: ReadonlyArray<BookModel> = [];
  @Output() add = new EventEmitter<string>();
}
