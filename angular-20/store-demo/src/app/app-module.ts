import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { StoreModule } from '@ngrx/store';
import { booksReducer } from './satate/books.reducer';
import { collectionReducer } from './satate/collection.reducer';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BookList } from './book-list/book-list';
import { BookCollection } from './book-collection/book-collection';

@NgModule({
  declarations: [App, BookList, BookCollection],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ books: booksReducer, collection: collectionReducer }),
  ],
  providers: [provideBrowserGlobalErrorListeners(), provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [App],
})
export class AppModule {}
