import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  catchError,
  map,
  Observable,
  of,
  switchMap,
  tap,
  throwError,
  shareReplay,
  BehaviorSubject,
  filter,
} from 'rxjs';
import { Product } from './product';
import { HttpErrorService } from '../utilities/http-error.service';
import { ReviewService } from '../reviews/review.service';
import { Review } from '../reviews/review';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = 'api/products'; // api/products/:id

  private http = inject(HttpClient);
  private errorService = inject(HttpErrorService);
  private reviewService = inject(ReviewService);

  private productSelectedSubject = new BehaviorSubject<number | undefined>(
    undefined
  );
  readonly productSelected$ = this.productSelectedSubject.asObservable();

  readonly products$ = this.http.get<Product[]>(this.productsUrl).pipe(
    tap((p) => console.log(JSON.stringify(p))),
    shareReplay(1),
    // tap(() => console.log('After shareReplay')),
    catchError((err) => this.handleError(err))
  );

  // product$.subscribe()
  readonly product$ = this.productSelected$.pipe(
    tap((p) => p),
    filter(Boolean), // !!p - null, undefined, 0, '', false, 'false'
    switchMap((id) => {
      const productUrl = `${this.productsUrl}/${id}`;
      return this.http.get<Product>(productUrl).pipe(
        tap(() => console.log('In http.get byid pipe')),
        switchMap((p) => this.getProductsWithReviews(p)),
        catchError((err) => this.handleError(err))
      );
    }),
    tap(s => s)
  ); // -> product ID --- number

  // getProduct(id: number): Observable<Product> {
  //   const productUrl = `${this.productsUrl}/${id}`;
  //   return this.http.get<Product>(productUrl).pipe(
  //     tap(() => console.log('In http.get byid pipe')),
  //     switchMap((p) => this.getProductsWithReviews(p)),
  //     catchError((err) => this.handleError(err))
  //   );
  // }

  getProductsWithReviews(product: Product): Observable<Product> {
    if (product.hasReviews) {
      return this.http
        .get<Review[]>(this.reviewService.getReviewUrl(product.id))
        .pipe(map((reviews) => ({ ...product, reviews })));
    }
    return of(product);
  }

  productSelected(selectedProductId: number): void {
    this.productSelectedSubject.next(selectedProductId);
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    const formatted = this.errorService.formatError(err);
    return throwError(() => formatted);
  }
}
