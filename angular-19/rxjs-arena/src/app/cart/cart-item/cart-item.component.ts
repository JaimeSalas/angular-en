import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, computed, inject, Input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartItem } from '../cart';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CurrencyPipe, FormsModule, NgFor, NgIf],
  templateUrl: './cart-item.component.html',
  styles: ``,
})
export class CartItemComponent {
  @Input({ required: true }) set cartItem(value: CartItem) {
    this.item.set(value);
  }

  private cartService = inject(CartService);

  item = signal<CartItem>(undefined!);

  // Quantity available (hard-coded to 8)
  // Mapped to an array from 1-8
  qtyArr = [...Array(8).keys()].map((x) => x + 1);

  // Calculate the extended price
  // exPrice = this.cartItem?.quantity * this.cartItem?.product.price;
  exPrice = computed(() => this.item().quantity * this.item().product.price);

  // '1' + '1' -> '11'
  onQuantitySelected(quantity: number): void {
    this.cartService.updateQuantity(this.item(), +quantity);
  }

  removeFromCart(): void {
    this.cartService.removeFromCart(this.item());
  }
}
