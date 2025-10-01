import { Component, inject, OnInit } from '@angular/core';
import { BookStore } from './books.store';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-books',
  imports: [JsonPipe],
  template: `
    <p>Books: {{ store.books() | json }}</p>
    <p>Loading: {{ store.isLoading() }}</p>

    <p>Pagination: {{ store.filter() | json }}</p>

    <p>Query: {{ store.filter.query() }}</p>
    <p>Order: {{ store.filter.order() }}</p>

    <p>Books count: {{ store.booksCount() }}</p>
    <p>Order: {{ store.sortedBooks() | json }}</p>

    <button (click)="reorder('asc')">Order Asc</button>
    <button (click)="reorder('desc')">Order Desc</button>

    <input (input)="filterUpdated($event)" />
  `,
  styles: ``,
  // providers: [BookStore]
})
export class Books implements OnInit {
  readonly store = inject(BookStore);

  async ngOnInit(): Promise<void> {
    // await this.store.loadAll();
  }

  reorder(order: 'asc' | 'desc') {
    this.store.updateOrder(order);
  }

  filterUpdated($event: Event) {
    this.store.updateQuery(($event.target as HTMLInputElement).value);
    const query = this.store.filter().query;
    this.store.loadByQuery(query);
  }
}
