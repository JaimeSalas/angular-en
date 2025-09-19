import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { Product } from './product';
import { ProductData } from './product-data';
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

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl).pipe(
      tap(() => console.log('In http.get pipe')),
      catchError((err) => this.handleError(err))
    );
  }

  getProduct(id: number): Observable<Product> {
    const productUrl = `${this.productsUrl}/${id}`;
    return this.http.get<Product>(productUrl).pipe(
      tap(() => console.log('In http.get byid pipe')),
      // map((p) => this.getProductsWithReviews(p)),
      catchError((err) => this.handleError(err))
    );
  }

  getProductsWithReviews(product: Product): Observable<Product> {
    if (product.hasReviews) {
      return this.http
        .get<Review[]>(this.reviewService.getReviewUrl(product.id))
        .pipe(map((reviews) => ({ ...product, reviews })));
    }

    return of(product);
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    const formatted = this.errorService.formatError(err);
    return throwError(() => formatted);
  }
}
