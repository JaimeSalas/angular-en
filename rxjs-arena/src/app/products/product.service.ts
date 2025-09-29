import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
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
  combineLatest,
} from 'rxjs';
import { Product, Result } from './product';
import { HttpErrorService } from '../utilities/http-error.service';
import { ReviewService } from '../reviews/review.service';
import { Review } from '../reviews/review';
import { toSignal } from '@angular/core/rxjs-interop';

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
  selectedProductId = signal<number | undefined>(undefined);

  private productsResult$ = this.http.get<Product[]>(this.productsUrl).pipe(
    map((p) => ({ data: p } as Result<Product[]>)),
    tap((p) => console.log(JSON.stringify(p))),
    shareReplay(1),
    catchError((err) =>
      of({
        data: [],
        error: this.errorService.formatError(err),
      } as Result<Product[]>)
    )
  );

  private productsResult = toSignal(this.productsResult$, {
    initialValue: { data: [] } as Result<Product[]>,
  });

  products = computed(() => this.productsResult().data);

  productsError = computed(() => this.productsResult().error);
  // products = computed(() => {
  //   try {
  //     return toSignal(this.products$, { initialValue: [] as Product[] });
  //   } catch (error) {
  //     return [] as Product[];
  //   }
  // });

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
    })
  ); // -> product ID --- number

  // product$ = combineLatest([this.productSelected$, this.products$]).pipe(
  //   tap((x) => x),
  //   map(([selectedProductId, products]) =>
  //     products.find((p) => p.id === selectedProductId)
  //   ),
  //   filter(Boolean),
  //   switchMap((p) => this.getProductsWithReviews(p)),
  //   catchError((err) => this.handleError(err))
  // );

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
    this.selectedProductId.set(selectedProductId);
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    const formatted = this.errorService.formatError(err);
    return throwError(() => formatted);
  }
}
