import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Book } from './book.model';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private http = inject(HttpClient);
  private booksUrl =
    'https://www.googleapis.com/books/v1/volumes?maxResults=5&orderBy=relevance&q=oliver%20sacks';

  getByQuery(query: string): Observable<Book[]> {
    const baseURL = 'https://www.googleapis.com/books/v1/volumes?maxResults=5&orderBy=relevance&q=';
    const encodedQuery = encodeURIComponent(query);
    const url = `${baseURL}${encodedQuery}`;

    return this.http.get<{ items: Book[] }>(url).pipe(map((data) => data.items || []));
  }

  async getBooksPromise(): Promise<Book[]> {
    const response = await fetch(this.booksUrl);
    if (response.ok) {
      const result = await response.json();
      return result.items;
    }

    return [];
  }
}
