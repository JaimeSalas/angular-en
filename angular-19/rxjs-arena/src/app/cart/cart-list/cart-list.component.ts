import { Component, inject  } from '@angular/core';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { NgFor, NgIf } from '@angular/common';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [CartItemComponent, NgFor, NgIf],
  templateUrl: './cart-list.component.html',
  styles: ``,
})
export class CartListComponent {
  pageTitle = 'Cart';
  private cartService = inject(CartService);
  cartItems = this.cartService.cartItems;

  // constructor() {
  //   const t = this.cartItems();
  //   console.log(t);
  // }
}
