import { computed, effect, Injectable, signal } from '@angular/core';
import { CartItem } from './cart';
import { Product } from '../products/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems = signal<CartItem[]>([]);

  cartCount = computed(
    () => this.cartItems().reduce((acc, curr) => acc + curr.quantity, 0) // [0, ]
  ); // map [[]] - [[]] flatMap [[]] - [] reduce

  subTotal = computed(() =>
    this.cartItems().reduce(
      (acc, curr) => acc + curr.product.price * curr.quantity,
      0
    )
  );

  deliveryFee = computed(() => (this.subTotal() < 50 ? 5.99 : 0));

  tax = computed(() => Math.round(this.subTotal() * 10) / 100);

  totalPrice = computed(
    () => this.subTotal() + this.deliveryFee() + this.tax()
  );

  eLength = effect(() =>
    console.log('Cart array length', this.cartItems().length)
  );

  addToCart(product: Product): void {
    // Immutable
    this.cartItems.update((items) => [...items, { product, quantity: 1 }]);
  }

  updateQuantity(cartItem: CartItem, quantity: number): void {
    this.cartItems.update((items) =>
      items.map((i) =>
        i.product.id === cartItem.product.id ? { ...i, quantity } : i
      )
    );
  }

  removeFromCart(cartItem: CartItem): void {
    this.cartItems.update((items) =>
      items.filter((i) => i.product.id !== cartItem.product.id)
    );
  }
}
