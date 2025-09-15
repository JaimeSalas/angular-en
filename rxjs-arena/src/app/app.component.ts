import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { of, from, Subscription, fromEvent } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLinkActive, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  pageTitle = 'Lemoncode Store';
  cartCount = 0;

  sub!: Subscription;
  subArray!: Subscription;
  subFrom!: Subscription;
  subEvent!: Subscription;

  ngOnInit(): void {
    this.sub = of(2, 4, 6, 8).subscribe((i) =>
      console.log(`Value from of: ${i}`)
    );

    this.subArray = of([2, 4, 6, 8]).subscribe((i) =>
      console.log(`Value from of: ${i}`)
    );

    // this -> dynamic -> calc runtime
    this.subFrom = from([20, 15, 10, 5]).subscribe({
      next(value) {
        console.log('From item:', value);
      },
      error(err) {
        console.error(err);
      },
      complete() {
        console.log('completed');
      },
    });

    this.subEvent = fromEvent(document, 'click').subscribe({
      next: (value) => {
        console.log('Click evt', value.target);
      },
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.subArray.unsubscribe();
    this.subFrom.unsubscribe();
    this.subEvent.unsubscribe();
  }
}
