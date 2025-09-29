import { Component, signal, effect, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from './product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'signals-lab';

  quantity = signal(1);
  qtyAvailable = signal([1, 2, 3, 4, 5, 6]);
  selectedProduct = signal<Product>({ id: 1, name: 'Foo', price: 12 });
  exPrice = computed(() => this.selectedProduct().price * this.quantity());
  color = computed(() => (this.exPrice() > 50 ? 'green' : 'blue'));

  constructor() {
    console.log(`Signals value ${this.quantity()}`);

    // effect(() => console.log('In effect: ', this.quantity()));

    this.quantity.update((q) => q * 2);
  }

  private e = effect(() => console.log('In effect: ', this.quantity()));

  onQuantitySelected($event: number) {
    this.quantity.set($event);
    // this.quantity.set(67);
    // this.quantity.set(42);
  }
}
