import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CartService } from './cart/cart.service';
import { BehaviorSubject, of, tap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLinkActive, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  pageTitle = 'Lemon store';
  // cartCount = 0;
  cartService = inject(CartService);
  cartCount = this.cartService.cartCount;

  // o$ = of(1, 2, 3);

  // s = toSignal(this.o$, { initialValue: 0 });

  // e = effect(() => console.log(this.s()));

  // t = signal(8);
  // validate = computed(() => {
  //   if (this.t() === 8) {
  //     throw 'Error!!';
  //   }
  // });

  // valueSubject = new BehaviorSubject(8);
  // value$ = this.valueSubject.asObservable().pipe(tap((x) => console.log(x))).subscribe();

  // constructor() {
  //   this.valueSubject.next(31)
  //   this.valueSubject.next(61)
  //   this.valueSubject.next(91)
  // }

  value = signal(8);
  value$ = toObservable(this.value)
    .pipe(tap((x) => console.log(x)))
    .subscribe();

  constructor() {
    this.value.set(89);
    this.value.set(99);
    this.value.set(109);
  }
}
