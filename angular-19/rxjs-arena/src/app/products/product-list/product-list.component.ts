import {  NgClass  } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgClass, ProductDetailComponent],
  templateUrl: './product-list.component.html',
  styles: ``,
})
export class ProductListComponent {
  // Just enough here for the template to compile
  pageTitle = 'Products';

  private productService = inject(ProductService);

  products = this.productService.products;
  errorMessage = this.productService.productsError;

  // Selected product id to highlight the entry
  // selectedProductId: number = 0;
  readonly selectedProductId = this.productService.selectedProductId;

  onSelected(productId: number): void {
    // this.selectedProductId = productId;
    this.productService.productSelected(productId);
  }
}
