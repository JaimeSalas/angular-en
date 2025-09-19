import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { catchError, EMPTY, of, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, ProductDetailComponent],
  templateUrl: './product-list.component.html',
  styles: ``,
})
export class ProductListComponent implements OnInit, OnDestroy {
  // Just enough here for the template to compile
  pageTitle = 'Products';
  errorMessage = '';
  sub: Subscription | undefined;

  private productService = inject(ProductService);

  // Products
  products: Product[] = [];

  ngOnInit(): void {
    this.sub = this.productService
      .getProducts()
      .pipe(
        tap(() => console.log('In component pipeline')),
        catchError((err) => {
          this.errorMessage = err;
          return EMPTY;
        })
      )
      .subscribe((ps) => (this.products = ps));
  }

  // Selected product id to highlight the entry
  selectedProductId: number = 0;

  onSelected(productId: number): void {
    this.selectedProductId = productId;
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
