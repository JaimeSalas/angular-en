import { CurrencyPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-total',
  standalone: true,
  imports: [NgIf, CurrencyPipe],
  templateUrl: './cart-total.component.html',
  styles: ``,
})
export class CartTotalComponent {
  // cartItems = [];
  cartService = inject(CartService);
  cartItems = this.cartService.cartItems;

  subTotal = this.cartService.subTotal;
  deliveryFee = this.cartService.deliveryFee;
  tax = this.cartService.tax;
  totalPrice = this.cartService.totalPrice;
}
