import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BookModel } from './book.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Books {
  private http = inject(HttpClient);
  private booksUrl =
    'https://www.googleapis.com/books/v1/volumes?maxResults=5&orderBy=relevance&q=oliver%20sacks';

  getBooks(): Observable<BookModel[]> {
    return this.http
      .get<{ items: BookModel[] }>(this.booksUrl)
      .pipe(map((books) => books.items || []));
  }
}
